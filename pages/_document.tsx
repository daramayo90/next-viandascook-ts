import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { GTM_ID } from '../analytics/ga4';
import { PIXEL_ID } from '../analytics/meta';

class MyDocument extends Document {
   static async getInitialProps(ctx: DocumentContext) {
      const initalProps = await Document.getInitialProps(ctx);

      return initalProps;
   }

   render() {
      return (
         <Html lang='es'>
            <Head>
               {/* Google Merchant */}
               <meta
                  name='google-site-verification'
                  content='8GvsTH5TNbCcrIXVrO1ye4X1hwwxz47NCH5Rvtr7zLg'
               />

               <link rel='icon' href='/logo/viandas-icon.png' />

               <link
                  rel='stylesheet'
                  href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap'
               />
            </Head>
            <body>
               <noscript>
                  <iframe
                     src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                     height='0'
                     width='0'
                     style={{ display: 'none', visibility: 'hidden' }}></iframe>
               </noscript>

               <noscript>
                  <iframe
                     src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                     height='0'
                     width='0'
                     style={{ display: 'none', visibility: 'hidden' }}></iframe>
               </noscript>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;
