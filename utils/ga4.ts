// Add this interface to extend the Window interface with 'gtag'
interface GA4Window extends Window {
   gtag: (command: string, targetId: string | undefined, config?: any) => void;
}

declare let window: GA4Window;

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace 'G-XXXXXXXXXX' with your GA4 measurement ID.

export const pageview = (url: string) => {
   if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

   // window.gtag('config', GA_MEASUREMENT_ID, {
   //    page_path: url,
   // });
};

export const event = (action: string, params: any = {}) => {
   if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

   // window.gtag('event', action, params);
};
