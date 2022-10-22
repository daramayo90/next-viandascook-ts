import { CouponsState } from './';

type CouponsActionType = { type: '[Coupons] - Add Coupon' };

export const couponsReducer = (state: CouponsState, action: CouponsActionType): CouponsState => {
   switch (action.type) {
      case '[Coupons] - Add Coupon':
         return {
            ...state,
         };

      default:
         return state;
   }
};
