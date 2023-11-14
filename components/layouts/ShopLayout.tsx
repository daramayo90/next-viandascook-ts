import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Footer, SideMenu, TabMenu } from '../ui';
import { ShopNavbar } from '../navbar';
import { pageTitles } from '../../utils';
import { CartSummary } from '../checkout';

interface Props {
   children: ReactNode;
   title: string;
   pageDescription: string;
   can?: string;
   keywords?: string;
   imageFullUrl?: string;
   noIndex?: boolean;
}

export const ShopLayout: FC<Props> = ({
   children,
   title,
   pageDescription,
   can,
   keywords,
   imageFullUrl,
   noIndex,
}) => {
   const router = useRouter();
   const path = router.pathname;

   let navTitle = '';
   let menuPage = false;
   let backCart = false;

   const hasFooter = path.includes('checkout') || path.includes('mi-cuenta');

   const setPath = (routerPath: string) => {
      Object.entries(pageTitles).forEach(([path, title]): void => {
         if (routerPath === path) navTitle = title;
         if (routerPath === '/menu') menuPage = true;
         if (routerPath === '/cart') backCart = true;
      });
   };

   setPath(path);

   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name='description' content={pageDescription} />
            <meta name='keywords' content={keywords} />

            <meta name='og:title' content={title} />
            <meta name='og:description' content={pageDescription} />
            <meta name='viewport' content='width=device-width, user-scalable=no' />

            {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
            {noIndex && <meta name='robots' content='noindex, nofollow' />}

            <link rel='canonical' href={can} />
         </Head>
         {path.includes('checkout') ? <CartSummary /> : <TabMenu />}
         <nav>
            <ShopNavbar pageTitle={navTitle} menuPage={menuPage} backCart={backCart} />
         </nav>
         <main>{children}</main>
         <SideMenu />
         {!hasFooter && (
            <footer>
               <Footer />
            </footer>
         )}
         ,
      </>
   );
};
