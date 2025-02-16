import { FC, useEffect } from 'react';
import { GA_TRACKING_ID, GTM_ID } from './ga4';
import { PIXEL_ID } from './meta';
import { HOTJAR_ID, HOTJAR_SV } from './hotjar';
import Script from 'next/script';

export const Scripts: FC = () => {
   useEffect(() => {
      if (window.gtag !== undefined) {
         return;
      }
   }, []);

   return (
      <>
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
            async={true}
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy='afterInteractive'
         />
         <Script id='google-analytics' strategy='afterInteractive' async={true}>
            {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){window.dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${GA_TRACKING_ID}');
            `}
         </Script>

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

         {/* Hotjar */}
         <Script id='hotjar-analytics' strategy='afterInteractive' async={true}>
            {`
               (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${HOTJAR_ID},hjsv:${HOTJAR_SV}};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
               })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
         </Script>
      </>
   );
};
