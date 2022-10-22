import { FC, ReactNode, useReducer, useContext } from 'react';
import { CouponsContext, couponsReducer } from './';

import { CartContext } from '../cart';

import { ICoupon } from '../../interfaces';

interface Props {
   children: ReactNode;
}
export interface CouponsState {
   coupon?: ICoupon;
}

const COUPONS_INITIAL_STATE: CouponsState = {
   coupon: undefined,
};

export const CouponsProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(couponsReducer, COUPONS_INITIAL_STATE);

   const { subTotal, total } = useContext(CartContext);

   return <CouponsContext.Provider value={{ ...state }}>{children}</CouponsContext.Provider>;
};
