import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
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
         <SWRConfig
            value={{
               fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
            }}>
            <AuthProvider>
               <UIProvider>
                  <CartProvider>
                     <OrdersProvider>
                        {loading ? <LoadingPage /> : <Component {...pageProps} />}
                     </OrdersProvider>
                  </CartProvider>
               </UIProvider>
            </AuthProvider>
         </SWRConfig>
      </SessionProvider>
   );
}

export default MyApp;
