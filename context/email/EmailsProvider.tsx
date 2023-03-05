import { FC, ReactNode, useReducer, useContext } from 'react';
import { EmailsContext, emailsReducer } from './';
import { OrdersContext } from '../orders';
import { viandasApi } from '../../axiosApi';
import { getSession } from 'next-auth/react';
import { ShippingAddress } from '../../interfaces';
import { CartContext } from '../cart';
import { UIContext } from '../ui';

interface Props {
   children: ReactNode;
}
export interface EmailsState {
   prop1: boolean;
}

const EMAILS_INITIAL_STATE: EmailsState = {
   prop1: false,
};

export const EmailsProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(emailsReducer, EMAILS_INITIAL_STATE);

   const { shippingAddress, orderId, paymentMethod } = useContext(OrdersContext);
   const { deliveryDateSelected } = useContext(UIContext);
   const {
      cart,
      numberOfItems,
      subTotal,
      discount,
      couponDiscount,
      referralDiscount,
      pointsDiscount,
      shipping,
      total,
   } = useContext(CartContext);

   const sendOrderConfirmationEmail = async () => {
      const { user } = ((await getSession()) as any) || '';

      const ship: ShippingAddress = user ? user.shipping : shippingAddress;

      const body = {
         name: user.name,
         orderId,
         address: `${ship.address}, Casa/Depto: ${ship.address2}`,
         deliveryDate: deliveryDateSelected,
         cart,
         numberOfItems,
         subTotal,
         discount,
         couponDiscount,
         referralDiscount,
         pointsDiscount,
         shipping,
         paymentMethod,
         total,
      };

      await viandasApi.post('/email/orderConfirmation', body);
   };

   return (
      <EmailsContext.Provider value={{ ...state, sendOrderConfirmationEmail }}>
         {children}
      </EmailsContext.Provider>
   );
};
