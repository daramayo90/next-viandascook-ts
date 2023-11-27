import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
// import Script from 'next/script';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';

import { FloatingWhatsApp } from 'react-floating-whatsapp';

import { SWRConfig } from 'swr';
import { useLoader } from '../hooks';
import { ga, meta } from '../utils';

import { AuthProvider, CartProvider, EmailsProvider } from '../context';
import { UIProvider } from '../context/ui';
import { OrdersProvider } from '../context/orders';

import { lightTheme } from '../themes';

import LoadingPage from '../components/ui/Loading';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
   ga.useGoogleAnalytics();
   meta.useMetaPixel();

   const { loading } = useLoader();

   const router = useRouter();

   const isAdminRoute = router.pathname.startsWith('/admin');

   const isHideFloatingWhatsApp =
      router.pathname.startsWith('/admin') ||
      router.pathname.startsWith('/cocina') ||
      router.pathname.startsWith('/onlera');

   return (
      <SessionProvider>
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
      </SessionProvider>
   );

   function AppContent() {
      return (
         <>
            <AuthProvider>
               <UIProvider>
                  <CartProvider>
                     <OrdersProvider>
                        <EmailsProvider>
                           {loading ? (
                              <LoadingPage />
                           ) : (
                              <>
                                 {!isHideFloatingWhatsApp && (
                                    <FloatingWhatsApp
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
                                 )}
                                 <Component {...pageProps} />
                              </>
                           )}
                        </EmailsProvider>
                     </OrdersProvider>
                  </CartProvider>
               </UIProvider>
            </AuthProvider>
         </>
      );
   }
}

export default MyApp;
