import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UIProvider } from '../context/ui';
import { AuthProvider, CartProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <SessionProvider>
         <AuthProvider>
            <CartProvider>
               <UIProvider>
                  <Component {...pageProps} />
               </UIProvider>
            </CartProvider>
         </AuthProvider>
      </SessionProvider>
   );
}

export default MyApp;
