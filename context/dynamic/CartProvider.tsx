import dynamic from 'next/dynamic';

const CartProvider = dynamic(
   () => import('../cart/CartProvider').then((module) => module.CartProvider),
   {
      ssr: false, // Set to true if server-side rendering is needed
      // loading: () => <p>Loading Cart...</p>, // Optional: Loading component
   },
);

export default CartProvider;
