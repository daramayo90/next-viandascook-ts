import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { GA_MEASUREMENT_ID } from '../utils/ga4';

class MyDocument extends Document {
   static async getInitialProps(ctx: DocumentContext) {
      const initalProps = await Document.getInitialProps(ctx);

      return initalProps;
   }

   render() {
      return (
         <Html>
            <Head>
               <Script id='gtm-head'>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
               })(window,document,'script','dataLayer','GTM-WWP3752');`}</Script>

               {/* Google Analytics 4 */}
               {GA_MEASUREMENT_ID && (
                  <>
                     <Script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                     />
                     <Script id='ga4'>{`window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                     gtag('js', new Date());
                     gtag('config', '${GA_MEASUREMENT_ID}');`}</Script>
                  </>
               )}
               {/* End Google Analytics 4 */}

               <link href='https://fonts.googleapis.com' />
               <link href='https://fonts.cdnfonts.com' />
               <link href='https://fonts.cdnfonts.com/css/gilroy-bold' rel='stylesheet' />
               <link href='https://fonts.cdnfonts.com/css/reinata' rel='stylesheet' />
               <link href='https://fonts.cdnfonts.com/css/pretty-queen' rel='stylesheet' />
               <link
                  rel='stylesheet'
                  href='https://fonts.googleapis.com/icon?family=Material+Icons'
               />
               <link
                  href='https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;1,300&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap'
                  rel='stylesheet'
               />
            </Head>
            <body>
               <noscript>
                  <iframe
                     src='https://www.googletagmanager.com/ns.html?id=GTM-WWP3752'
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
