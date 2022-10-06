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
   let menuPage = false;

   switch (path) {
      case '/menu':
         navTitle = 'Viandas Cook';
         menuPage = true;
         break;

      case '/descuentos':
         navTitle = 'Descuentos';
         break;

      case '/cart':
         navTitle = 'Carrito';
         break;

      case '/cart/empty':
         navTitle = 'Carrito';
         break;

      case '/auth/login-checkout':
         navTitle = 'Iniciar Sesión ';
         break;

      case '/checkout#':
      case '/checkout':
         navTitle = '¡Último Paso!';
         break;

      case '/checkout/address':
         navTitle = 'Dirección de envío';
         break;

      case '/checkout/promociones':
         navTitle = 'Promos Vigentes';
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
            <meta name='viewport' content='width=device-width, user-scalable=no' />
            {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
         </Head>

         <nav>
            <ShopNavbar pageTitle={navTitle} menuPage={menuPage} />
         </nav>

         <SideMenu />

         <main>{children}</main>
      </>
   );
};
