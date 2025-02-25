import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint: number = 600) => {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
         setIsMobile(mediaQuery.matches);

         const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
         mediaQuery.addEventListener('change', handleChange);

         return () => {
            mediaQuery.removeEventListener('change', handleChange);
         };
      }
   }, [breakpoint]);

   return isMobile;
};
