import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { AuthNavbar } from '../navbar';
import { SideMenu, TabMenu } from '../ui';

interface Props {
   title: string;
   children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name='og:title' content={title} />
            <meta name='robots' content='noindex, nofollow' />
         </Head>

         <nav>
            <AuthNavbar pageTitle={title} />
         </nav>

         <SideMenu />

         <main>{children}</main>
      </>
   );
};
