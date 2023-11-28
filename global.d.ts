interface Window {
   dataLayer: any[];
   gtag: (type: 'config' | 'event' | 'js', googleAnalyticsId: string | Date, options?: any) => void;
   fbq: (
      type: 'init' | 'track' | 'trackCustom',
      eventName: string,
      params?: Record<string, any>,
   ) => void;
}
