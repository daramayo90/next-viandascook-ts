/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';

import Cookies from 'js-cookie';

import { viandasApi } from '../../axiosApi';
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
   referralCoupon: string;
   numberOfItems: number;
   subTotal: number;
   discount: number;
   shipping: number;
   couponDiscount: number;
   referralDiscount: number;
   points?: number;
   pointsDiscount?: number;
   total: number;
}

const CART_INITIAL_STATE: CartState = {
   isLoaded: false,
   cart: [],
   coupons: [],
   referralCoupon: '',
   numberOfItems: 0,
   subTotal: 0,
   discount: 0,
   shipping: 0,
   couponDiscount: 0,
   referralDiscount: 0,
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

   // Add Referral Coupon to cookies
   useEffect(() => {
      if (state.referralCoupon) Cookies.set('referralCoupon', JSON.stringify(state.referralCoupon));
   }, [state.referralCoupon]);

   // Add Referral Discount to cookies
   useEffect(() => {
      if (state.referralDiscount)
         Cookies.set('referralDiscount', JSON.stringify(state.referralDiscount));
   }, [state.referralDiscount]);

   // Add Points to cookies
   useEffect(() => {
      if (state.points !== 0) Cookies.set('points', JSON.stringify(state.points));
   }, [state.points]);

   // Add Total to cookies
   useEffect(() => {
      if (state.total !== 0) Cookies.set('total', JSON.stringify(state.total));
   }, [state.total]);

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
      const referralDiscount = state.referralCoupon ? state.subTotal * 0.05 : 0;

      const total =
         subTotal - discount - pointsDiscount - couponDiscount - referralDiscount + shipping;

      const orderSummary = {
         numberOfItems,
         subTotal,
         discount,
         shipping,
         couponDiscount,
         pointsDiscount,
         referralDiscount,
         total,
      };

      dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
   }, [
      state.cart,
      state.shipping,
      state.coupons,
      state.points,
      state.referralCoupon,
      state.referralDiscount,
   ]);

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

   // Load Referral Coupon from Cookies
   useEffect(() => {
      try {
         const cookieReferralCoupon: string = JSON.parse(Cookies.get('referralCoupon')!) || '';
         dispatch({ type: '[Cart] - Load Ref Coupon from Cookies', payload: cookieReferralCoupon });
      } catch (error) {
         dispatch({ type: '[Cart] - Load Ref Coupon from Cookies', payload: '' });
      }
   }, []);

   // Load Referral Discount from Cookies
   useEffect(() => {
      try {
         const cookieReferralDiscount: number = JSON.parse(Cookies.get('referralDiscount')!);
         dispatch({ type: '[Cart] - Load Ref Disc from Cookies', payload: cookieReferralDiscount });
      } catch (error) {
         dispatch({ type: '[Cart] - Load Ref Disc from Cookies', payload: 0 });
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

   // Load Total from Cookies
   useEffect(() => {
      try {
         const cookieTotal: number = Number(JSON.parse(Cookies.get('total')!)) || 0;
         dispatch({ type: '[Cart] - Load Total from Cookies', payload: cookieTotal });
      } catch (error) {
         dispatch({ type: '[Cart] - Load Total from Cookies', payload: 0 });
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
      if (!couponCode)
         return {
            error: true,
            msg: `Ningún cupón seleccionado`,
         };

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

   // Remove referral coupon from order summary in checkout page
   const removeReferralCoupon = () => {
      Cookies.remove('referralCoupon');
      dispatch({ type: '[Cart] - Remove Referral Coupon' });
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

   // Validate referral coupon
   const onUseRefCoupon = async (couponCode: string): Promise<{ error: boolean; msg?: string }> => {
      try {
         const { data } = await viandasApi.get('/coupon/refCoupon', {
            params: { code: couponCode },
         });

         dispatch({ type: '[Cart] - Add Referral Coupon', payload: couponCode });

         return {
            error: false,
            msg: data,
         };
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
            removeReferralCoupon,
            orderComplete,
            repeatOrder,
            onUsePoints,
            onUseRefCoupon,
         }}>
         {children}
      </CartContext.Provider>
   );
};
