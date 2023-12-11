import { Suspense } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';

import { SWRConfig } from 'swr';
import { useGoogleAnalytics } from '../analytics/ga4';
import { useMetaPixel } from '../analytics/meta';
import { Scripts } from '../analytics/Scripts';

import { useLoader } from '../hooks';

import CustomWhatsApp from '../context/dynamic/CustomWhatsApp';
import LoadingPage from '../components/ui/Loading';

import {
   CartProvider,
   OrdersProvider,
   EmailsProvider,
   UIProvider,
   AuthProvider,
} from '../context/dynamic';

import { lightTheme } from '../themes';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
   const router = useRouter();
   const { loading } = useLoader();

   useGoogleAnalytics();
   useMetaPixel();

   const isMainPage = router.pathname === '/';

   const isAdminRoute =
      router.pathname.startsWith('/admin') ||
      router.pathname.startsWith('/cocina') ||
      router.pathname.startsWith('/onlera');

   return (
      <SessionProvider>
         <AuthProvider>
            <UIProvider>
               {isAdminRoute ? (
                  <SWRConfig
                     value={{
                        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
                     }}>
                     <ThemeProvider theme={lightTheme}>
                        <AppContent />
                     </ThemeProvider>
                  </SWRConfig>
               ) : (
                  <AppContent />
               )}
            </UIProvider>
         </AuthProvider>
      </SessionProvider>
   );

   function AppContent() {
      return (
         <>
            {isMainPage ? (
               <PageContent />
            ) : (
               <CartProvider>
                  <OrdersProvider>
                     <EmailsProvider>
                        <PageContent />
                     </EmailsProvider>
                  </OrdersProvider>
               </CartProvider>
            )}
         </>
      );
   }

   function PageContent() {
      return (
         <Suspense fallback={loading && <LoadingPage />}>
            <CustomWhatsApp />

            <Scripts />

            <Component {...pageProps} />
         </Suspense>
      );
   }
}

export default MyApp;
