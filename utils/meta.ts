import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ICartProduct, IOrderItem, IProduct } from '../interfaces';
import { FB } from '.';

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;

export const pageview = (): void => {
   window.fbq('track', FB.EVENTS.PAGE_VIEW);
};

export const useMetaPixel = (): void => {
   const router = useRouter();

   useEffect(() => {
      console.log('123');
   }, [router.events]);
};

export const addToCart = (product: IProduct | IOrderItem): void => {
   window.fbq('track', FB.EVENTS.ADD_TO_CART, {
      content_ids: [product._id],
      content_name: product.name,
      content_type: 'product',
      contents: [
         {
            id: product._id,
            quantity: 1,
         },
      ],
      currency: 'ARS',
      value: product.price,
   });
};

export const removeFromCart = (product: IProduct | IOrderItem): void => {
   window.fbq('track', FB.EVENTS.REMOVE_FROM_CART, {
      content_ids: [product._id],
      content_name: product.name,
      content_type: 'product',
      contents: [
         {
            id: product._id,
            quantity: 1,
         },
      ],
      currency: 'ARS',
      value: product.price,
   });
};

export const newSubscriber = (email: string): void => {
   window.fbq('track', FB.EVENTS.COMPLETE_REGISTRATION, {
      content_name: email,
      status: true,
      value: 10.0,
      currency: 'ARS',
   });
};

export const beginCheckout = (cart: ICartProduct[]): void => {
   const contents = cart.map((item: ICartProduct) => ({
      id: item._id,
      quantity: item.quantity,
      price: item.quantity * item.price,
   }));

   window.fbq('track', FB.EVENTS.INITIATE_CHECKOUT, {
      content_ids: contents.map((content) => content.id),
      content_type: 'product',
      contents: contents,
      currency: 'ARS',
      value: contents.reduce((total, item) => total + item.quantity * item.price, 0),
      num_items: contents.length,
   });
};

export const purchase = (orderItems: IOrderItem[], total: number): void => {
   const contents = orderItems.map((item) => ({
      id: item._id,
      quantity: item.quantity,
   }));

   window.fbq('track', FB.EVENTS.PURCHASE, {
      content_ids: contents.map((content) => content.id),
      content_type: 'product',
      contents: contents,
      currency: 'ARS',
      value: total,
      num_items: contents.length,
   });
};

export const viewItem = (product: IProduct): void => {
   window.fbq('track', FB.EVENTS.VIEW_CONTENT, {
      content_ids: [product._id],
      content_name: product.name,
      content_type: 'product',
      contents: [
         {
            id: product._id,
            quantity: 1,
         },
      ],
      currency: 'ARS',
      value: product.price,
   });
};
