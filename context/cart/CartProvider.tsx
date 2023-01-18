import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';

import Cookies from 'js-cookie';

import { viandasApi } from '../../api';
import { coupon, currency, promo } from '../../utils';

import { CartContext, cartReducer } from './';
import { ICartProduct, ICoupon, IUser } from '../../interfaces';

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
   points?: number;
   pointsDiscount?: number;
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
   points: 0,
   pointsDiscount: 0,
   total: 0,
};

export const CartProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
   const { data, status } = useSession();

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

   // Add Points to cookies
   useEffect(() => {
      if (state.points !== 0) Cookies.set('points', JSON.stringify(state.points));
   }, [state.points]);

   // Calculation of: quantity / subTotal / discount / shipping fee / total
   useEffect(() => {
      const numberOfItems = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
      const subTotal = state.cart.reduce((prev, curr) => curr.quantity * curr.price + prev, 0);
      const discount = promo.calculation(numberOfItems, subTotal);

      if (numberOfItems >= 14) {
         state.shipping = 0;
         Cookies.remove('shipping');
      }

      const pointsDiscount = state.points ? state.points / 30 : 0;
      const shipping = state.shipping;

      const couponDiscount = state.coupons?.reduce((p, c) => coupon.calc(c, subTotal) + p, 0) || 0;

      const total = subTotal - discount - pointsDiscount - couponDiscount + shipping;

      const orderSummary = {
         numberOfItems,
         subTotal,
         discount,
         shipping,
         couponDiscount,
         pointsDiscount,
         total,
      };

      dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
   }, [state.cart, state.shipping, state.coupons, state.points]);

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

   // Load Points from Cookies
   useEffect(() => {
      try {
         const cookiePoints: number = Number(JSON.parse(Cookies.get('points')!)) || 0;
         dispatch({ type: '[Cart] - Load Points from Cookies', payload: cookiePoints });
      } catch (error) {
         dispatch({ type: '[Cart] - Load Points from Cookies', payload: 0 });
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

      if (city === 'CABA') shippingCost = Number(process.env.NEXT_PUBLIC_CABA);
      if (city === 'Buenos Aires') shippingCost = Number(process.env.NEXT_PUBLIC_BA);

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
               msg: `El subtotal debe ser mayor a ${currency.format(minAmount)}`,
            };

         if (state.subTotal > maxAmount)
            return {
               error: true,
               msg: `El subtotal debe ser menor a ${currency.format(maxAmount)}`,
            };

         dispatch({ type: '[Cart] - Add Coupon', payload: data });

         return { error: false };
      } catch (error: any) {
         return {
            error: true,
            msg: error.response.data.message,
         };
      }
   };

   // Remove coupon from order summary in checkout page
   const removeCoupon = () => {
      Cookies.remove('coupons');
      dispatch({ type: '[Cart] - Remove Coupon' });
   };

   // Order completion
   const orderComplete = () => {
      dispatch({ type: '[Cart] - Order Complete' });
   };

   // Add products to cart from id history order
   const repeatOrder = (orderItems: ICartProduct[]) => {
      dispatch({ type: '[Cart] - Repeat Order', payload: orderItems });
   };

   // Redeem points
   const onUsePoints = async (points: number): Promise<{ error: boolean; msg?: string }> => {
      if (status !== 'authenticated') {
         return {
            error: true,
            msg: 'Debes estar logueado para canjear puntos',
         };
      }

      if (state.subTotal < 6000) {
         return {
            error: true,
            msg: 'Debes tener un mínimo de $6.000 gastados',
         };
      }

      const user = data.user as IUser;

      try {
         await viandasApi.put('/points', { points, user });

         dispatch({ type: '[Cart] - Redeem Points', payload: points });

         return { error: false };
      } catch (error: any) {
         return {
            error: true,
            msg: error.response.data.message,
         };
      }
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
            repeatOrder,
            onUsePoints,
         }}>
         {children}
      </CartContext.Provider>
   );
};
