import { createContext } from 'react';
import { ICartProduct, ICoupon, IPaymentMethods, ShippingAddress } from '../../interfaces';

interface ContextProps {
   isLoaded: boolean;
   cart: ICartProduct[];
   coupons: ICoupon[];
   referralCoupon: string;
   numberOfItems: number;
   numberOfPacks: number;
   totalQuantityOfItems: number;
   subTotal: number;
   discount: number;
   shipping: number;
   couponDiscount: number;
   referralDiscount: number;
   points?: number;
   pointsDiscount?: number;
   cashDiscount?: number;
   total: number;
   paymentMethod: IPaymentMethods;
   // shippingAddress?: ShippingAddress;

   addProductToCart: (product: ICartProduct) => void;
   updateCartQuantity: (product: ICartProduct) => void;
   removeCartProduct: (product: ICartProduct) => void;
   calculateShipping: (city: string) => void;

   addCoupon: (couponCode: string) => Promise<{ error: boolean; msg?: string }>;
   removeCoupon: () => void;
   removeReferralCoupon: () => void;
   orderComplete: () => void;
   repeatOrder: (orderItems: ICartProduct[]) => void;

   onUsePoints: (points: number) => Promise<{ error: boolean; msg?: string }>;
   onUseRefCoupon: (couponCode: string) => Promise<{ error: boolean; msg?: string }>;
   updatePaymentMethod: (paymentMethod: IPaymentMethods) => void;
}

export const CartContext = createContext({} as ContextProps);
