import { FC, ReactNode, useEffect, useReducer, useContext } from 'react';
import { getSession } from 'next-auth/react';

import Cookies from 'js-cookie';
import crypto from 'crypto';

import { viandasApi } from '../../axiosApi';
import { ShippingAddress, ICity, IOrder } from '../../interfaces';
import { IPaymentMethods } from '../../interfaces/order';

import { CartContext, UIContext } from '../';
import { OrdersContext, ordersReducer } from './';

interface Props {
   children: ReactNode;
}
export interface OrdersState {
   shippingAddress?: ShippingAddress;
   orderId: number;
   paymentMethod: IPaymentMethods;
}

const ORDERS_INITIAL_STATE: OrdersState = {
   shippingAddress: undefined,
   orderId: 0,
   paymentMethod: 'efectivo',
};

export const OrdersProvider: FC<Props> = ({ children }) => {
   const { deliveryDateSelected } = useContext(UIContext);
   const {
      cart,
      coupons,
      numberOfItems,
      subTotal,
      discount,
      shipping,
      couponDiscount,
      referralDiscount,
      pointsDiscount,
      total,
   } = useContext(CartContext);

   const [state, dispatch] = useReducer(ordersReducer, ORDERS_INITIAL_STATE);

   // Guest user - Load address from cookies
   useEffect(() => {
      if (Cookies.get('address')) {
         const shippingAddress = {
            firstName: Cookies.get('firstName') || '',
            lastName: Cookies.get('lastName') || '',
            address: Cookies.get('address') || '',
            address2: Cookies.get('address2') || '',
            zipcode: Cookies.get('zipcode') || '',
            city: Cookies.get('city') === 'CABA' ? ('CABA' as ICity) : ('Buenos Aires' as ICity),
            phone: Cookies.get('phone') || '',
            email: Cookies.get('email') || '',
            dni: Cookies.get('dni') || '',
         };

         dispatch({ type: '[Cart] - Load Address from Cookies', payload: shippingAddress });
      }
   }, []);

   // Guest user - Add address to cookies
   const addGuestAddress = (address: ShippingAddress) => {
      Cookies.set(
         'firstName',
         address.firstName.charAt(0).toUpperCase() + address.firstName.slice(1).toLocaleLowerCase(),
      );
      Cookies.set(
         'lastName',
         address.lastName.charAt(0).toUpperCase() + address.lastName.slice(1).toLocaleLowerCase(),
      );
      Cookies.set('address', address.address);
      Cookies.set('address2', address.address2 || '');
      Cookies.set('zipcode', address.zipcode);
      Cookies.set('city', address.city);
      Cookies.set('phone', address.phone);
      Cookies.set('email', address.email.toLocaleLowerCase());
      Cookies.set('dni', address.dni);

      dispatch({ type: '[Orders] - Add Shipping Address', payload: address });
   };

   const createOrder = async (
      paymentMethod: IPaymentMethods,
   ): Promise<{ hasError: boolean; message: string; token?: string }> => {
      const { user } = ((await getSession()) as any) || '';

      const shippingAddress: ShippingAddress = user ? user.shipping : state.shippingAddress;

      if (!shippingAddress) {
         return {
            hasError: true,
            message: 'Indicanos una dirección de entrega antes de continuar',
         };
      }

      if (shippingAddress.address.length < 4) {
         return {
            hasError: true,
            message: 'Indicanos una dirección de entrega antes de continuar',
         };
      }

      if (
         new Date().getDate() === deliveryDateSelected.getDate() &&
         new Date().getMonth() === deliveryDateSelected.getMonth()
      ) {
         return {
            hasError: true,
            message: 'Por favor, seleccioná una fecha de entrega',
         };
      }

      const token = crypto.randomBytes(32).toString('hex');

      const body: IOrder = {
         token,
         orderItems: cart.map((product) => product),
         coupons,
         shippingAddress,
         deliveryDate: deliveryDateSelected,
         numberOfItems,
         subTotal,
         discount,
         shipping,
         couponDiscount,
         referralDiscount,
         pointsDiscount,
         total,
         paymentMethod,
         isPaid: false,
      };

      try {
         const { data } = await viandasApi.post<IOrder>('/orders', body);

         if (coupons.length !== 0) {
            await viandasApi.put('user/addCoupon', coupons[0]);
         }

         const orderData = {
            orderId: data._id!,
            paymentMethod: data.paymentMethod,
         };

         dispatch({ type: '[Orders] - Order Complete', payload: orderData });

         return {
            hasError: false,
            message: data._id!.toString(),
            token,
         };
      } catch (error: any) {
         return {
            hasError: true,
            message: error.response.data.message,
         };
      }
   };

   const createMPOrder = async (
      orderId: string,
      token: string,
   ): Promise<{ id: string; init_point: string; error?: string }> => {
      const body = {
         orderItems: cart.map((product) => product),
         numberOfItems,
         discount,
         shipping,
         couponDiscount,
         pointsDiscount,
         orderId,
         token,
      };

      try {
         const { data } = await viandasApi.post('/mercadopago', body);

         return {
            id: data.id,
            init_point: data.init_point,
         };
      } catch (error: any) {
         return {
            id: '',
            init_point: '',
            error: error.response.data.message,
         };
      }
   };

   const addMailchimpClient = async (orderId: string) => {
      const { user } = ((await getSession()) as any) || '';

      try {
         const { data } = await viandasApi.get('/mailchimp/getSubscriberHash');
         const { id } = data;

         const subs = {
            email: user ? user.email : Cookies.get('email'),
            name: user ? user.name : Cookies.get('firstName'),
            lastName: user ? user.lastName : Cookies.get('lastName'),
         };

         if (!id) {
            await viandasApi.post('/mailchimp/addClient', { subs, orderId, total, cart });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const addReferralPoints = async (referralCoupon: string) => {
      try {
         await viandasApi.patch('/orders/addReferralPoints', { referralCoupon });
      } catch (error) {}
   };

   const orderToSpreadsheet = async (): Promise<void> => {
      const { user } = ((await getSession()) as any) || '';

      const shippingAddress: ShippingAddress = user ? user.shipping : state.shippingAddress;

      const { address, address2, city } = shippingAddress;

      const body = {
         user,
         orderId: state.orderId,
         today: new Date().toLocaleDateString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
         }),
         address,
         address2,
         city,
         paymentMethod: state.paymentMethod.charAt(0).toUpperCase() + state.paymentMethod.slice(1),
         total,
         deliveryDate: deliveryDateSelected.toLocaleDateString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
         }),
      };

      try {
         await viandasApi.post('/orders/spreadsheet', body);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <OrdersContext.Provider
         value={{
            ...state,
            addGuestAddress,
            createOrder,
            createMPOrder,
            addMailchimpClient,
            addReferralPoints,
            orderToSpreadsheet,
         }}>
         {children}
      </OrdersContext.Provider>
   );
};
