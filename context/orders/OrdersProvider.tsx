import { FC, ReactNode, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

import { OrdersContext, ordersReducer } from './';
import { ShippingAddress, ICity } from '../../interfaces';

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
            city: Cookies.get('city') === 'caba' ? ('caba' as ICity) : ('ba' as ICity),
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

   return (
      <OrdersContext.Provider value={{ ...state, addGuestAddress }}>
         {children}
      </OrdersContext.Provider>
   );
};
