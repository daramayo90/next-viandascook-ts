import { ICartProduct, ICoupon } from '../../interfaces';

import { CartState } from './';

type CartActionType =
   | { type: '[Cart] - Load Cart from Cookies'; payload: ICartProduct[] }
   | { type: '[Cart] - Load Shipping from Cookies'; payload: number }
   | { type: '[Cart] - Load Coupons from Cookies'; payload: ICoupon[] }
   | { type: '[Cart] - Load Points from Cookies'; payload: number }
   | { type: '[Cart] - Update Products'; payload: ICartProduct[] }
   | { type: '[Cart] - Update Quantity'; payload: ICartProduct[] }
   | { type: '[Cart] - Remove Product'; payload: ICartProduct[] }
   | { type: '[Cart] - Empty Cart'; payload: ICartProduct[] }
   | { type: '[Cart] - Calculate Shipping'; payload: number }
   | { type: '[Cart] - Add Coupon'; payload: ICoupon }
   | { type: '[Cart] - Remove Coupon' }
   | { type: '[Cart] - Order Complete' }
   | {
        type: '[Cart] - Update Order Summary';
        payload: {
           numberOfItems: number;
           subTotal: number;
           discount: number;
           shipping: number;
           couponDiscount: number;
           total: number;
        };
     }
   | { type: '[Cart] - Repeat Order'; payload: ICartProduct[] }
   | { type: '[Cart] - Redeem Points'; payload: number };

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

      case '[Cart] - Load Coupons from Cookies':
         return {
            ...state,
            coupons: action.payload,
         };

      case '[Cart] - Load Points from Cookies':
         return {
            ...state,
            points: action.payload,
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

      case '[Cart] - Update Order Summary':
         return {
            ...state,
            ...action.payload,
         };

      case '[Cart] - Add Coupon':
         return {
            ...state,
            coupons: [action.payload],
         };

      case '[Cart] - Remove Coupon':
         return {
            ...state,
            coupons: [],
            couponDiscount: 0,
         };

      case '[Cart] - Order Complete':
         return {
            ...state,
            cart: [],
            coupons: [],
            numberOfItems: 0,
            subTotal: 0,
            discount: 0,
            shipping: 0,
            couponDiscount: 0,
            total: 0,
         };

      case '[Cart] - Repeat Order':
         return {
            ...state,
            isLoaded: true,
            cart: action.payload,
         };

      case '[Cart] - Redeem Points':
         return {
            ...state,
            points: Number(state.points) + Number(action.payload),
         };

      default:
         return state;
   }
};
