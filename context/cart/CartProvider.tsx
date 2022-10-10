import { FC, ReactNode, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces';

interface Props {
   children: ReactNode;
}

export interface CartState {
   isLoaded: boolean;
   cart: ICartProduct[];
   numberOfItems: number;
   subTotal: number;
   total: number;
}

const CART_INITIAL_STATE: CartState = {
   isLoaded: false,
   cart: [],
   numberOfItems: 0,
   subTotal: 0,
   total: 0,
};

export const CartProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

   // Load Cart from Cookies
   useEffect(() => {
      try {
         const cookieProducts: ICartProduct[] = JSON.parse(Cookies.get('cart')!) || [];
         dispatch({ type: '[Cart] - Load Cart from Cookies', payload: cookieProducts });
      } catch (error) {
         dispatch({ type: '[Cart] - Load Cart from Cookies', payload: [] });
      }
   }, []);

   // Add Cart Products to Cookies
   useEffect(() => {
      if (state.cart.length > 0) Cookies.set('cart', JSON.stringify(state.cart));
   }, [state.cart]);

   // TODO: Calcular el shipping + cupones
   useEffect(() => {
      const numberOfItems = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
      const subTotal = state.cart.reduce((prev, curr) => curr.quantity * curr.price + prev, 0);
      const total = subTotal;

      const orderSummary = {
         numberOfItems,
         subTotal,
         total,
      };

      dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
   }, [state.cart]);

   // Add Product to Cart
   const addProductToCart = (product: ICartProduct) => {
      const productInCart = state.cart.some((p) => p._id === product._id);

      if (!productInCart) {
         return dispatch({ type: '[Cart] - Update Products', payload: [...state.cart, product] });
      }

      const updatedProducts = state.cart.map((p) => {
         if (p._id === product._id) {
            p.quantity += product.quantity;
         }
         return p;
      });

      return dispatch({ type: '[Cart] - Update Products', payload: updatedProducts });
   };

   // Update Quantity in Cart Product
   const updateCartQuantity = (product: ICartProduct) => {
      const products = state.cart.map((p) => {
         if (p._id !== product._id) return p;

         return product;
      });

      dispatch({ type: '[Cart] - Update Quantity', payload: products });
   };

   // Remove Product from Cart
   const removeCartProduct = (product: ICartProduct) => {
      const products = state.cart.filter((p) => !(p._id === product._id));

      dispatch({ type: '[Cart] - Remove Product', payload: products });

      if (state.cart.length === 1) Cookies.remove('cart');
   };

   return (
      <CartContext.Provider
         value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
         }}>
         {children}
      </CartContext.Provider>
   );
};
