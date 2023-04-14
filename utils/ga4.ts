// lib/analytics.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const GA_TRACKING_ID = 'G-360949087'; // Replace with your measurement ID

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
