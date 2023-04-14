interface Window {
   gtag: (
      type: 'config' | 'event',
      googleAnalyticsId: string,
      options: { page_path: string },
   ) => void;
}
