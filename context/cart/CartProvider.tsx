import { FC, ReactNode, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

import { viandasApi } from '../../api';
import { coupon, currency, promo } from '../../utils';

import { CartContext, cartReducer } from './';
import { ICartProduct, ICoupon } from '../../interfaces';

interface Props {
   children: ReactNode;
}

export interface CartState {
   isLoaded: boolean;
   cart: ICartProduct[];
   coupons: ICoupon[];
   numberOfItems: number;
   subTotal: number;
   discount: number;
   shipping: number;
   couponDiscount: number;
   total: number;
}

const CART_INITIAL_STATE: CartState = {
   isLoaded: false,
   cart: [],
   coupons: [],
   numberOfItems: 0,
   subTotal: 0,
   discount: 0,
   shipping: 0,
   couponDiscount: 0,
   total: 0,
};

export const CartProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

   // Add Cart products to cookies
   useEffect(() => {
      if (state.cart.length > 0) Cookies.set('cart', JSON.stringify(state.cart));
   }, [state.cart]);

   // Add Shipping cost to cookies
   useEffect(() => {
      if (state.shipping !== 0) Cookies.set('shipping', JSON.stringify(state.shipping));
   }, [state.shipping]);

   // Add Coupons to cookies
   useEffect(() => {
      if (state.coupons.length > 0) Cookies.set('coupons', JSON.stringify(state.coupons));
   }, [state.coupons]);

   // Calculation of: quantity / subTotal / discount / shipping fee / total
   useEffect(() => {
      const numberOfItems = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
      const subTotal = state.cart.reduce((prev, curr) => curr.quantity * curr.price + prev, 0);
      const discount = promo.calculation(numberOfItems, subTotal);

      if (numberOfItems >= 14) {
         state.shipping = 0;
         Cookies.remove('shipping');
      }

      const shipping = state.shipping;

      const couponDiscount = state.coupons?.reduce((p, c) => coupon.calc(c, subTotal) + p, 0) || 0;

      const total = subTotal - discount - couponDiscount + shipping;

      const orderSummary = {
         numberOfItems,
         subTotal,
         discount,
         shipping,
         couponDiscount,
         total,
      };

      dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
   }, [state.cart, state.shipping, state.coupons]);

   // Load Cart from Cookies
   useEffect(() => {
      try {
         const cookieProducts: ICartProduct[] = JSON.parse(Cookies.get('cart')!) || [];
         dispatch({ type: '[Cart] - Load Cart from Cookies', payload: cookieProducts });
      } catch (error) {
         dispatch({ type: '[Cart] - Load Cart from Cookies', payload: [] });
      }
   }, []);

   // Load Shipping cost from Cookies
   useEffect(() => {
      try {
         const cookieShipping: number = Number(JSON.parse(Cookies.get('shipping')!)) || 0;
         dispatch({ type: '[Cart] - Load Shipping from Cookies', payload: cookieShipping });
      } catch (error) {
         dispatch({ type: '[Cart] - Load Shipping from Cookies', payload: 0 });
      }
   }, []);

   // Load Coupons from Cookies
   useEffect(() => {
      try {
         const cookieCoupons: ICoupon[] = JSON.parse(Cookies.get('coupons')!) || [];
         dispatch({ type: '[Cart] - Load Coupons from Cookies', payload: cookieCoupons });
      } catch (error) {
         dispatch({ type: '[Cart] - Load Coupons from Cookies', payload: [] });
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

      if (state.cart.length === 1) Cookies.remove('cart');
   };

   // Calculate shipping value in cart page
   const calculateShipping = (city: string) => {
      let shippingCost: number = 0;

      if (city === 'caba') shippingCost = Number(process.env.NEXT_PUBLIC_CABA);
      if (city === 'ba') shippingCost = Number(process.env.NEXT_PUBLIC_BA);

      dispatch({ type: '[Cart] - Calculate Shipping', payload: shippingCost });
   };

   // Add a coupon in checkout page
   const addCoupon = async (couponCode: string): Promise<{ error: boolean; msg?: string }> => {
      try {
         const { data } = await viandasApi.get('/coupon', { params: { code: couponCode } });

         const { minAmount, maxAmount } = data;

         if (state.subTotal < minAmount)
            return {
               error: true,
               msg: `El sub total debe ser mayor a ${currency.format(minAmount)}`,
            };

         if (state.subTotal > maxAmount)
            return {
               error: true,
               msg: `El sub total debe ser menor a ${currency.format(maxAmount)}`,
            };

         dispatch({ type: '[Cart] - Add Coupon', payload: [...state.coupons!, data] });

         return { error: false };
      } catch (error: any) {
         return {
            error: true,
            msg: error.response.data.message,
         };
      }
   };

   const removeCoupon = () => {
      Cookies.remove('coupons');
      dispatch({ type: '[Cart] - Remove Coupon' });
   };

   const orderComplete = () => {
      dispatch({ type: '[Cart] - Order Complete' });
   };

   return (
      <CartContext.Provider
         value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            calculateShipping,
            addCoupon,
            removeCoupon,
            orderComplete,
         }}>
         {children}
      </CartContext.Provider>
   );
};
