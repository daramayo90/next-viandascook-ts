import dynamic from 'next/dynamic';

const OrdersProvider = dynamic(
   () => import('../orders/OrdersProvider').then((module) => module.OrdersProvider),
   {
      ssr: false, // Set to true if server-side rendering is needed
      // loading: () => <p>Loading Cart...</p>, // Optional: Loading component
   },
);

export default OrdersProvider;
