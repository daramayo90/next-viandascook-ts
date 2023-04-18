import { FC, ReactNode, useReducer } from 'react';
import { EmailsContext, emailsReducer } from './';
import { viandasApi } from '../../axiosApi';
import { IOrder, IUser, ShippingAddress } from '../../interfaces';

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

   const sendOrderConfirmationEmail = async (order: IOrder) => {
      const { name, email } = order.user as IUser;

      const { address, address2 } = order.shippingAddress as ShippingAddress;

      const {
         _id,
         deliveryDate,
         orderItems,
         numberOfItems,
         subTotal,
         discount,
         couponDiscount,
         referralDiscount,
         pointsDiscount,
         shipping,
         paymentMethod,
         total,
      } = order;

      const body = {
         orderId: _id,
         name,
         toEmail: email,
         address: `${address}, Casa/Depto: ${address2}`,
         deliveryDate,
         cart: orderItems,
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

   const sendWireTransferInfo = async (order: IOrder) => {
      const { name, email } = order.user as IUser;
      const { _id, total } = order;

      await viandasApi.post('/email/wireTransferInfo', { name, email, _id, total });
   };

   return (
      <EmailsContext.Provider
         value={{ ...state, sendOrderConfirmationEmail, sendWireTransferInfo }}>
         {children}
      </EmailsContext.Provider>
   );
};
