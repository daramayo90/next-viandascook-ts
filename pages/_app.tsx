import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UIProvider } from '../context/ui';
import { CartProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <CartProvider>
         <UIProvider>
            <Component {...pageProps} />
         </UIProvider>
      </CartProvider>
   );
}

export default MyApp;
