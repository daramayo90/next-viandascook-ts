import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';

import { FloatingWhatsApp } from 'react-floating-whatsapp';

import { SWRConfig } from 'swr';
import { useLoader } from '../hooks';
import { ga } from '../utils';

import { AuthProvider, CartProvider, EmailsProvider } from '../context';
import { UIProvider } from '../context/ui';
import { OrdersProvider } from '../context/orders';

import { lightTheme } from '../themes';

import LoadingPage from '../components/ui/Loading';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
   ga.useGoogleAnalytics();

   const { loading } = useLoader();

   const router = useRouter();

   const isHideFloatingWhatsApp =
      router.pathname.startsWith('/admin') || router.pathname.startsWith('/cocina');

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
                        <EmailsProvider>
                           <ThemeProvider theme={lightTheme}>
                              {loading ? (
                                 <LoadingPage />
                              ) : (
                                 <>
                                    {!isHideFloatingWhatsApp && (
                                       <FloatingWhatsApp
                                          phoneNumber='+5491171080193'
                                          accountName='Mari'
                                          allowEsc
                                          allowClickAway
                                          avatar='/logo/wp-logo.jpg'
                                          chatMessage='Hola 👋, te saluda Mari de Viandas Cook.. ¿cómo puedo ayudarte?'
                                          statusMessage='Atención de 09 a 19hs'
                                          placeholder='Escribe tu mensaje..'
                                          darkMode
                                          chatboxStyle={{ bottom: '9rem' }}
                                       />
                                    )}
                                    <Script src='https://sdk.mercadopago.com/js/v2' />
                                    <Component {...pageProps} />
                                 </>
                              )}
                           </ThemeProvider>
                        </EmailsProvider>
                     </OrdersProvider>
                  </CartProvider>
               </UIProvider>
            </AuthProvider>
         </SWRConfig>
      </SessionProvider>
   );
}

export default MyApp;
