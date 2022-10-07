import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UIProvider } from '../context/ui';
import { AuthProvider, CartProvider } from '../context';
import { OrdersProvider } from '../context/orders';

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <SessionProvider>
         <AuthProvider>
            <CartProvider>
               <OrdersProvider>
                  <UIProvider>
                     <Component {...pageProps} />
                  </UIProvider>
               </OrdersProvider>
            </CartProvider>
         </AuthProvider>
      </SessionProvider>
   );
}

export default MyApp;
