import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { useLoader } from '../hooks';
import { ga, meta } from '../utils';

import { CartProvider, OrdersProvider, EmailsProvider } from '../context/dynamic';
import WhatsApp from '../context/dynamic/FloatingWhatsApp';

import LoadingPage from '../components/ui/Loading';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
   ga.useGoogleAnalytics();
   meta.useMetaPixel();

   const { loading } = useLoader();

   const router = useRouter();

   const isMainPage = router.pathname === '/';

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
