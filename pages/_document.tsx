import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import Image from 'next/image';

import { ga, meta } from '../utils';

class MyDocument extends Document {
   static async getInitialProps(ctx: DocumentContext) {
      const initalProps = await Document.getInitialProps(ctx);

      return initalProps;
   }

   render() {
      return (
         <Html>
            <Head>
               {/* Start Google Analytics 4 */}
               <Script
                  async={true}
                  src={`https://www.googletagmanager.com/gtag/js?id=${ga.GA_TRACKING_ID}`}
                  strategy='afterInteractive'
               />
               <Script id='google-analytics' strategy='afterInteractive'>
                  {`
                     window.dataLayer = window.dataLayer || [];
                     function gtag(){window.dataLayer.push(arguments);}
                     gtag('js', new Date());

                     gtag('config', '${ga.GA_TRACKING_ID}');
                  `}
               </Script>
               {/* End Google Analytics 4 */}

               {/* Start Meta Pixel */}
               <Script id='meta-pixel' strategy='afterInteractive'>
                  {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${meta.PIXEL_ID}');
                    fbq('track', 'PageView');
                  `}
               </Script>
               <noscript>
                  <iframe
                     src={`https://www.facebook.com/tr?id=${meta.PIXEL_ID}&ev=PageView&noscript=1`}
                     height='0'
                     width='0'
                     style={{ display: 'none', visibility: 'hidden' }}></iframe>
               </noscript>
               {/* End Meta Pixel */}

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
