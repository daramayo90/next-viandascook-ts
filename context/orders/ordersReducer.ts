import { IPaymentMethods, ShippingAddress } from '../../interfaces';
import { OrdersState } from './';

type OrdersActionType =
   | { type: '[Cart] - Load Address from Cookies'; payload: ShippingAddress }
   | { type: '[Orders] - Add Shipping Address'; payload: ShippingAddress }
   | {
        type: '[Orders] - Order Complete';
        payload: {
           orderId: number;
           paymentMethod: IPaymentMethods;
           shippingAddress: ShippingAddress | undefined;
        };
     };

export const ordersReducer = (state: OrdersState, action: OrdersActionType): OrdersState => {
   switch (action.type) {
      case '[Cart] - Load Address from Cookies':
      case '[Orders] - Add Shipping Address':
         return {
            ...state,
            shippingAddress: action.payload,
         };

      case '[Orders] - Order Complete':
         return {
            ...state,
            ...action.payload,
         };

      default:
         return state;
   }
};
