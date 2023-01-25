import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { SWRConfig } from 'swr';
import { useLoader } from '../hooks';

import { AuthProvider, CartProvider } from '../context';
import { UIProvider } from '../context/ui';
import { OrdersProvider } from '../context/orders';

import { lightTheme } from '../themes';

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
                        <ThemeProvider theme={lightTheme}>
                           {loading ? <LoadingPage /> : <Component {...pageProps} />}
                        </ThemeProvider>
                     </OrdersProvider>
                  </CartProvider>
               </UIProvider>
            </AuthProvider>
         </SWRConfig>
      </SessionProvider>
   );
}

export default MyApp;
