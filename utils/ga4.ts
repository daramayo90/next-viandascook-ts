import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
      console.log('1235');
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
