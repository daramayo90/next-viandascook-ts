import { ICartProduct, ICoupon } from '../../interfaces';

import { CartState } from './';

type CartActionType =
   | { type: '[Cart] - Load Cart from Cookies'; payload: ICartProduct[] }
   | { type: '[Cart] - Load Shipping from Cookies'; payload: number }
   | { type: '[Cart] - Update Products'; payload: ICartProduct[] }
   | { type: '[Cart] - Update Quantity'; payload: ICartProduct[] }
   | { type: '[Cart] - Remove Product'; payload: ICartProduct[] }
   | { type: '[Cart] - Empty Cart'; payload: ICartProduct[] }
   | { type: '[Cart] - Calculate Shipping'; payload: number }
   | { type: '[Cart] - Add Coupon'; payload: ICoupon[] }
   | {
        type: '[Cart] - Update Order Summary';
        payload: {
           numberOfItems: number;
           subTotal: number;
           discount: number;
           shipping: number;
           total: number;
        };
     }
   | { type: '[Cart] - Order Complete' };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
   switch (action.type) {
      case '[Cart] - Load Cart from Cookies':
         return {
            ...state,
            isLoaded: true,
            cart: [...action.payload],
         };

      case '[Cart] - Load Shipping from Cookies':
         return {
            ...state,
            shipping: action.payload,
         };

      case '[Cart] - Update Products':
         return {
            ...state,
            cart: [...action.payload],
         };

      case '[Cart] - Update Quantity':
         return {
            ...state,
            cart: [...action.payload],
         };

      case '[Cart] - Remove Product':
         return {
            ...state,
            cart: action.payload,
         };

      case '[Cart] - Empty Cart':
         return {
            ...state,
            cart: [...action.payload],
         };

      case '[Cart] - Calculate Shipping':
         return {
            ...state,
            shipping: action.payload,
         };

      case '[Cart] - Add Coupon':
         return {
            ...state,
            coupons: [...action.payload],
         };

      case '[Cart] - Update Order Summary':
         return {
            ...state,
            ...action.payload,
         };

      default:
         return state;
   }
};
