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
   couponDiscount: number;
   points?: number;
   total: number;
   // shippingAddress?: ShippingAddress;

   addProductToCart: (product: ICartProduct) => void;
   updateCartQuantity: (product: ICartProduct) => void;
   removeCartProduct: (product: ICartProduct) => void;
   calculateShipping: (city: string) => void;

   addCoupon: (couponCode: string) => Promise<{ error: boolean; msg?: string }>;
   removeCoupon: () => void;
   orderComplete: () => void;
   repeatOrder: (orderItems: ICartProduct[]) => void;

   onUsePoints: (points: number) => Promise<{ error: boolean; msg?: string }>;
}

export const CartContext = createContext({} as ContextProps);
