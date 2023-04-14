interface Window {
   gtag: (type: 'config' | 'event', googleAnalyticsId: string, options: any) => void;
   fbq: (
      type: 'init' | 'track' | 'trackCustom',
      eventName: string,
      params?: Record<string, any>,
   ) => void;
}
