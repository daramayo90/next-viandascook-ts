import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const useLoader = () => {
   const router = useRouter();

   const [loading, setLoading] = useState(false);

   NProgress.configure({
      minimum: 0.3,
      easing: 'ease',
      speed: 300,
      showSpinner: false,
   });

   useEffect(() => {
      router.events.on('routeChangeStart', () => {
         NProgress.start();
         setLoading(true);
      });

      router.events.on('routeChangeComplete', () => {
         NProgress.done();
         setLoading(false);
      });

      router.events.on('routeChangeError', () => {
         NProgress.done();
         setLoading(false);
      });
   }, [router]);

   return { loading };
};
