import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface ContextProps {
   isLoaded: boolean;
   numberOfItems: number;

   addProductToCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
