import { createContext } from 'react';
import { ICartProduct, ICoupon, ShippingAddress } from '../../interfaces';

interface ContextProps {
   isLoaded: boolean;
   cart: ICartProduct[];
   coupons: ICoupon[];
   numberOfItems: number;
   subTotal: number;
   discount: number;
   shipping: number;
   couponsDiscount: number;
   total: number;
   // shippingAddress?: ShippingAddress;

   addProductToCart: (product: ICartProduct) => void;
   updateCartQuantity: (product: ICartProduct) => void;
   removeCartProduct: (product: ICartProduct) => void;
   calculateShipping: (city: string) => void;

   addCoupon: (couponCode: string) => Promise<{ error: boolean }>;
   removeCoupon: () => void;
}

export const CartContext = createContext({} as ContextProps);
