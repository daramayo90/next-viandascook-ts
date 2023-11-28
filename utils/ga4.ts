import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { IPaymentMethods } from '../interfaces';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID!;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;

interface IGAItems {
   item_id: string;
   item_name: string;
   affiliation?: string;
   currency?: string;
   price?: number;
   quantity?: number;
}

interface EventData {
   action: string;
   currency: string;
   items?: IGAItems[];
   transaction_id?: string;
   shipping?: number;
   value: number;
}

export const pageview = (url: string): void => {
   window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
   });
};

export const useGoogleAnalytics = (): void => {
   const router = useRouter();

   useEffect(() => {
      if (!window.gtag) {
         return;
      }

      const handleRouteChange = (url: string) => {
         pageview(url);
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
         router.events.off('routeChangeComplete', handleRouteChange);
      };
   }, [router.events]);
};

export const event = ({ action, currency, items, transaction_id, shipping, value }: EventData) => {
   if (window.gtag) {
      window.gtag('event', action, {
         currency,
         items,
         transaction_id,
         shipping,
         value,
      });
   }
};
