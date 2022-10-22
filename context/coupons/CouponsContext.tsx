import { createContext } from 'react';
import { ICoupon } from '../../interfaces';

interface ContextProps {
   coupon?: ICoupon;
}

export const CouponsContext = createContext({} as ContextProps);
