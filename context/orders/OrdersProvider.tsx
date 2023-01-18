import { FC, ReactNode, useEffect, useReducer, useContext } from 'react';
import { getSession } from 'next-auth/react';

import Cookies from 'js-cookie';

import { OrdersContext, ordersReducer } from './';
import { removeCookies } from '../../utils';

import { viandasApi } from '../../axiosApi';
import { ShippingAddress, ICity, IOrder } from '../../interfaces';
import { CartContext, UIContext } from '../';

interface Props {
   children: ReactNode;
}
export interface OrdersState {
   shippingAddress?: ShippingAddress;
}

const ORDERS_INITIAL_STATE: OrdersState = {
   shippingAddress: undefined,
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
      Cookies.set('firstName', address.firstName);
      Cookies.set('lastName', address.lastName);
      Cookies.set('address', address.address);
      Cookies.set('address2', address.address2 || '');
      Cookies.set('zipcode', address.zipcode);
      Cookies.set('city', address.city);
      Cookies.set('phone', address.phone);
      Cookies.set('email', address.email);
      Cookies.set('dni', address.dni);

      dispatch({ type: '[Orders] - Add Shipping Address', payload: address });
   };

   const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
      const { user } = ((await getSession()) as any) || '';

      const shippingAddress = user ? user.shipping : state.shippingAddress;

      if (!shippingAddress) {
         return {
            hasError: true,
            message: 'Indicanos una dirección de entrega antes de continuar',
         };
      }

      if (!deliveryDateSelected) {
         return {
            hasError: true,
            message: 'Por favor, seleccioná una fecha de entrega',
         };
      }

      const body: IOrder = {
         orderItems: cart.map((product) => product),
         coupons,
         shippingAddress,
         deliveryDate: deliveryDateSelected,
         numberOfItems,
         subTotal,
         discount,
         shipping,
         couponDiscount,
         pointsDiscount,
         total,
         isPaid: false,
      };

      try {
         const { data } = await viandasApi.post<IOrder>('/orders', body);

         if (coupons.length !== 0) {
            await viandasApi.put('user/addCoupon', coupons[0]);
         }

         removeCookies();

         return {
            hasError: false,
            message: data._id!,
         };
      } catch (error: any) {
         return {
            hasError: true,
            message: error.response.data.message,
         };
      }
   };

   return (
      <OrdersContext.Provider value={{ ...state, addGuestAddress, createOrder }}>
         {children}
      </OrdersContext.Provider>
   );
};
