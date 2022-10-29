import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider, CartProvider } from '../context';
import { UIProvider } from '../context/ui';
import { OrdersProvider } from '../context/orders';

import { useLoader } from '../hooks';
import LoadingPage from '../components/ui/Loading';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
   const { loading } = useLoader();

   return (
      <SessionProvider>
         <AuthProvider>
            <UIProvider>
               <CartProvider>
                  <OrdersProvider>
                     {loading ? <LoadingPage /> : <Component {...pageProps} />}
                  </OrdersProvider>
               </CartProvider>
            </UIProvider>
         </AuthProvider>
      </SessionProvider>
   );
}

export default MyApp;
