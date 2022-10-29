import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { SideMenu } from '../ui';
import { ShopNavbar } from '../navbar';

interface Props {
   children: ReactNode;
   title: string;
   pageDescription: string;
   imageFullUrl?: string;
}

export const ProductLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
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
            <ShopNavbar pageTitle={''} menuPage={false} backCart={false} />
         </nav>

         <SideMenu />

         <main>{children}</main>
      </>
   );
};
