import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Footer, SideMenu } from '../ui';
import { HomeNavbar, Navbar } from '../navbar';

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
            <meta name='viewport' content='width=device-width, user-scalable=no' />
            {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
         </Head>

         <nav>{router.asPath === '/' ? <HomeNavbar /> : <Navbar />}</nav>

         <SideMenu />

         <main id='main'>{children}</main>

         <footer>
            <Footer />
         </footer>
      </>
   );
};
