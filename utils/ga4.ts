import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID!;

interface EventData {
   action: string;
   category?: string;
   label?: string;
   value?: number;
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

export const event = ({ action, category, label, value }: EventData): void => {
   console.log('Google Analytics action', action);
   console.log('Google Analytics category', category);
   console.log('Google Analytics label', label);
   console.log('Google Analytics value', value);
   if (window.gtag) {
      window.gtag('event', action, {
         event_category: category,
         event_label: label,
         value: value,
      });
   }
};
