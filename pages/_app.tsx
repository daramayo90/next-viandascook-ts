import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
// import Script from 'next/script';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';

import { SWRConfig } from 'swr';
import { useLoader } from '../hooks';
import { ga, meta } from '../utils';

import {
   CartProvider,
   OrdersProvider,
   EmailsProvider,
   UIProvider,
   AuthProvider,
} from '../context/dynamic';
import WhatsApp from '../context/dynamic/FloatingWhatsApp';

import { lightTheme } from '../themes';

import LoadingPage from '../components/ui/Loading';

function MyApp({ Component, pageProps }: AppProps) {
   ga.useGoogleAnalytics();
   meta.useMetaPixel();

   const { loading } = useLoader();

   const router = useRouter();

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
