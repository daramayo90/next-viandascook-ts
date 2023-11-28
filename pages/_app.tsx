import type { AppProps } from 'next/app';

import { ga, meta } from '../utils';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
   ga.useGoogleAnalytics();
   meta.useMetaPixel();

   return <Component {...pageProps} />;
}

export default MyApp;
