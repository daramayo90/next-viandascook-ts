import { FC, ReactNode, useEffect, useReducer, useContext } from 'react';
import { getSession } from 'next-auth/react';

import Cookies from 'js-cookie';

import { viandasApi } from '../../axiosApi';
import { ShippingAddress, ICity, IOrder, IUser } from '../../interfaces';
import { IPaymentMethods } from '../../interfaces/order';
import { generateOrderToken } from '../../helpers/generateOrderToken';

import { CartContext, UIContext } from '../';
import { OrdersContext, ordersReducer } from './';

interface Props {
   children: ReactNode;
}
export interface OrdersState {
   shippingAddress?: ShippingAddress;
   orderId: number;
   // paymentMethod: IPaymentMethods;
}

const ORDERS_INITIAL_STATE: OrdersState = {
   shippingAddress: undefined,
   orderId: 0,
   // paymentMethod: 'efectivo',
};

export const OrdersProvider: FC<Props> = ({ children }) => {
   const { deliveryDateSelected } = useContext(UIContext);
   const {
      cart,
      coupons,
      totalQuantityOfItems,
      numberOfPacks,
      subTotal,
      discount,
      shipping,
      couponDiscount,
      referralDiscount,
      pointsDiscount,
      cashDiscount,
      total,
      paymentMethod,
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
            city2: Cookies.get('city2') || '',
            phone: Cookies.get('phone') || '',
            email: Cookies.get('email') || '',
            dni: Cookies.get('dni') || '',
         };

         dispatch({ type: '[Cart] - Load Address from Cookies', payload: shippingAddress });
      }
   }, []);

   // Guest user - Add address to cookies
   const addGuestAddress = async (address: ShippingAddress) => {
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
      Cookies.set('city2', address.city2 || '');
      Cookies.set('phone', address.phone);
      Cookies.set('email', address.email.toLocaleLowerCase());
      Cookies.set('dni', address.dni);

      await viandasApi.post('/user/createUserGuest');

      dispatch({ type: '[Orders] - Add Shipping Address', payload: address });
   };

   const createOrder = async (): Promise<{ hasError: boolean; message: string; token?: string }> => {
      const { user } = ((await getSession()) as any) || '';

      const shippingAddress: ShippingAddress = user ? user.shipping : state.shippingAddress;
      const address = shippingAddress.address;
      const address2 = shippingAddress.address2;

      if (!shippingAddress) {
         return {
            hasError: true,
            message: 'Indicanos una dirección de entrega antes de continuar',
         };
      }

      if (!address || address === '' || address === '-') {
         return {
            hasError: true,
            message: 'Indicanos una dirección válida antes de continuar',
         };
      }

      if (!address2 || address2 === '' || address2 === '-') {
         return {
            hasError: true,
            message: 'Indicanos el piso, depto o casa antes de continuar',
         };
      }

      if (
         shippingAddress.address.toLocaleLowerCase().includes('bermudez 1044') ||
         shippingAddress.address.toLocaleLowerCase().includes('bermúdez 1044')
      ) {
         return {
            hasError: true,
            message: 'Esta dirección de entrega no está permitida',
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

      const token = generateOrderToken();

      const body: IOrder = {
         token,
         orderItems: cart.map((product) => product),
         coupons,
         shippingAddress,
         deliveryDate: deliveryDateSelected,
         numberOfItems: totalQuantityOfItems,
         numberOfPacks,
         subTotal,
         discount,
         shipping,
         couponDiscount,
         referralDiscount,
         pointsDiscount,
         cashDiscount,
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
            shippingAddress: undefined,
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
         numberOfItems: totalQuantityOfItems,
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
      } catch (error) {
         console.log(error);
      }
   };

   const orderToSpreadsheet = async (order: IOrder): Promise<void> => {
      const { _id, paymentMethod, total, deliveryDate } = order;
      const { name, lastName, email, phone, dni } = order.user as IUser;
      const { address, address2, city2 } = order.shippingAddress as ShippingAddress;

      const deliveryDateObj = new Date(deliveryDate);

      const body = {
         _id,
         today: new Date().toLocaleDateString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
         }),
         name,
         lastName,
         email,
         phone,
         dni,
         address,
         address2,
         city2,
         paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
         total,
         deliveryDate: deliveryDateObj.toLocaleDateString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
         }),
      };

      try {
         await viandasApi.post('/orders/spreadsheet', body);
      } catch (error) {
         console.log(error);
      }
   };

   const orderToOptimoRoute = async (order: IOrder): Promise<void> => {
      const { _id, paymentMethod, total, deliveryDate } = order;
      const { name, email, phone } = order.user as IUser;
      const { address, address2, city2 } = order.shippingAddress as ShippingAddress;

      const deliveryDateObj = new Date(deliveryDate);

      const body = {
         _id,
         name,
         email,
         phone,
         address,
         address2,
         city2,
         paymentMethod,
         total,
         deliveryDate: deliveryDateObj.toLocaleDateString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
         }),
      };

      try {
         await viandasApi.post('/optimoroute', body);
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
            orderToOptimoRoute,
         }}>
         {children}
      </OrdersContext.Provider>
   );
};
