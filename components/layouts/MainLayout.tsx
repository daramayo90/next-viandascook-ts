import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { Footer, Navbar, NavbarHome, SideMenu } from '../ui';
import { useRouter } from 'next/router';

interface Props {
   children: ReactNode;
   title: string;
   pageDescription: string;
   imageFullUrl?: string;
}

export const MainLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
   const router = useRouter();

   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name='description' content={pageDescription} />

            <meta name='og:title' content={title} />
            <meta name='og:description' content={pageDescription} />
            {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
         </Head>

         <nav>{router.asPath === '/' ? <NavbarHome /> : <Navbar />}</nav>

         <SideMenu />

         <main id='main'>{children}</main>

         <footer>
            <Footer />
         </footer>
      </>
   );
};
