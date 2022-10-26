import { ShippingAddress } from '../../interfaces';
import { OrdersState } from './';

type OrdersActionType =
   | { type: '[Cart] - Load Address from Cookies'; payload: ShippingAddress }
   | { type: '[Orders] - Add Shipping Address'; payload: ShippingAddress }
   | { type: '[Orders] - Order Complete' };

export const ordersReducer = (state: OrdersState, action: OrdersActionType): OrdersState => {
   switch (action.type) {
      case '[Cart] - Load Address from Cookies':
      case '[Orders] - Add Shipping Address':
         return {
            ...state,
            shippingAddress: action.payload,
         };

      default:
         return state;
   }
};
