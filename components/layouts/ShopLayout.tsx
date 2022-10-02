import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { ShopNavbar } from '../navbar';
import { SideMenu } from '../ui';
import { useRouter } from 'next/router';

interface Props {
   children: ReactNode;
   title: string;
   pageDescription: string;
   imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
   const router = useRouter();
   const path = router.asPath;
   let navTitle = '';

   switch (path) {
      case '/descuentos':
         navTitle = 'Descuentos';
         break;

      case '/cart':
         navTitle = 'Carrito';
         break;

      case '/cart/empty':
         navTitle = 'Carrito';
         break;

      default:
         break;
   }
   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name='description' content={pageDescription} />

            <meta name='og:title' content={title} />
            <meta name='og:description' content={pageDescription} />
            {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
         </Head>

         <nav>
            <ShopNavbar pageTitle={navTitle} />
         </nav>

         <SideMenu />

         <main>{children}</main>
      </>
   );
};
