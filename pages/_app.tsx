import type { AppProps } from 'next/app';
import Script from 'next/script';

import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { FloatingWhatsApp } from 'react-floating-whatsapp';

import { SWRConfig } from 'swr';
import { useLoader } from '../hooks';

import { AuthProvider, CartProvider, EmailsProvider } from '../context';
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
                        <EmailsProvider>
                           <ThemeProvider theme={lightTheme}>
                              {loading ? (
                                 <LoadingPage />
                              ) : (
                                 <>
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
