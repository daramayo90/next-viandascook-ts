import { FC, ReactNode, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

import { ICartProduct, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';

interface Props {
   children: ReactNode;
}

export interface CartState {
   isLoaded: boolean;
   cart: ICartProduct[];
   numberOfItems: number;
   subTotal: number;
   total: number;

   shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
   isLoaded: false,
   cart: [],
   numberOfItems: 0,
   subTotal: 0,
   total: 0,
   shippingAddress: undefined,
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

   // TODO: Tomar la info de la base de datos
   // Load Address from Cookies
   useEffect(() => {
      if (Cookies.get('address')) {
         const shippingAddress = {
            firstName: Cookies.get('firstName') || '',
            lastName: Cookies.get('lastName') || '',
            address: Cookies.get('address') || '',
            address2: Cookies.get('address2') || '',
            zipcode: Cookies.get('zipcode') || '',
            city: Cookies.get('city') || '',
            phone: Cookies.get('phone') || '', // TODO: Transformar el numero a string
            email: Cookies.get('email') || '',
            dni: Cookies.get('dni') || '',
         };

         dispatch({ type: '[Cart] - Load Address from Cookies', payload: shippingAddress });
      }
   }, []);

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
   };

   // Update Address to Cookies
   const updateAddress = (address: ShippingAddress) => {
      Cookies.set('firstName', address.firstName);
      Cookies.set('lastName', address.lastName);
      Cookies.set('address', address.address);
      Cookies.set('address2', address.address2 || '');
      Cookies.set('zipcode', address.zipcode);
      Cookies.set('city', address.city);
      Cookies.set('phone', address.phone);
      Cookies.set('email', address.email);
      Cookies.set('dni', address.dni);
      dispatch({ type: '[Cart] - Update Shipping Address', payload: address });
   };

   return (
      <CartContext.Provider
         value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,
         }}>
         {children}
      </CartContext.Provider>
   );
};
