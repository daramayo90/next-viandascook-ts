import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';

import { useLoader } from '../hooks';
import { SWRConfig } from 'swr';
import { GA_TRACKING_ID, GTM_ID, useGoogleAnalytics } from '../analytics/ga4';
import { PIXEL_ID, useMetaPixel } from '../analytics/meta';

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
                  {/* Google Tag Manager */}
                  <Script id='google-tag-manager' strategy='afterInteractive' async={true}>
                     {`
                     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                     })(window,document,'script','dataLayer','${GTM_ID}');
                  `}
                  </Script>

                  {/* Google Analytics 4 */}
                  <Script
                     id='google-analytics'
                     src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                     strategy='afterInteractive'
                     async={true}
                     onLoad={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.gtag = (...args) => {
                           window.dataLayer.push([...args]);
                        };
                        window.gtag('js', new Date());
                        window.gtag('config', GA_TRACKING_ID);
                     }}
                  />

                  {/* Meta Pixel */}
                  <Script id='meta-pixel' strategy='afterInteractive' async={true}>
                     {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${PIXEL_ID}');
                    fbq('track', 'PageView');
                  `}
                  </Script>
                  <Component {...pageProps} />
               </>
            )}
         </>
      );
   }
}

export default MyApp;
