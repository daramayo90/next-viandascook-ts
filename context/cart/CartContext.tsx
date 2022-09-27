import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface ContextProps {
   isLoaded: boolean;
   cart: ICartProduct[];
   numberOfItems: number;

   addProductToCart: (product: ICartProduct) => void;
   updateCartQuantity: (product: ICartProduct) => void;
   removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);