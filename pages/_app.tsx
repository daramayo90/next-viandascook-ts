import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';

import { useLoader } from '../hooks';
import { SWRConfig } from 'swr';
import { useGoogleAnalytics } from '../analytics/ga4';
import { useMetaPixel } from '../analytics/meta';

import WhatsApp from '../context/dynamic/FloatingWhatsApp';
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
         <>
            {loading ? (
               <LoadingPage />
            ) : (
               <>
                  <WhatsApp
                     phoneNumber='+5491171080193'
                     accountName='Pame'
                     allowEsc
                     allowClickAway
                     avatar='/logo/wp-logo.jpg'
                     chatMessage='Hola 👋, te saluda Pame de Viandas Cook.. ¿cómo puedo ayudarte?'
                     statusMessage='Atención de 09 a 19hs'
                     placeholder='Escribe tu mensaje..'
                     darkMode
                     chatboxStyle={{ bottom: '9rem' }}
                  />
                  <Component {...pageProps} />
               </>
            )}
         </>
      );
   }
}

export default MyApp;
