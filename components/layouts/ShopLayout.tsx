import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { SideMenu, TabMenu } from '../ui';
import { ShopNavbar } from '../navbar';
import { pageTitles } from '../../utils';
import { CartSummary } from '../checkout';

interface Props {
   children: ReactNode;
   title: string;
   pageDescription: string;
   imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
   const router = useRouter();
   const path = router.pathname;

   let navTitle = '';
   let menuPage = false;
   let backCart = false;

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

            <meta name='og:title' content={title} />
            <meta name='og:description' content={pageDescription} />
            <meta name='viewport' content='width=device-width, user-scalable=no' />
            {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
         </Head>

         {path.includes('checkout') ? <CartSummary /> : <TabMenu />}

         <nav>
            <ShopNavbar pageTitle={navTitle} menuPage={menuPage} backCart={backCart} />
         </nav>

         <main>{children}</main>

         <SideMenu />
      </>
   );
};
