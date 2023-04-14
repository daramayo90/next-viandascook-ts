import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;

export const pageview = (): void => {
   window.fbq('track', 'PageView');
};

export const useMetaPixel = (): void => {
   const router = useRouter();

   useEffect(() => {
      if (!window.fbq) {
         return;
      }

      const handleRouteChange = () => {
         pageview();
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
         router.events.off('routeChangeComplete', handleRouteChange);
      };
   }, [router.events]);
};
