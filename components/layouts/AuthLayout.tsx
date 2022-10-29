import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { AuthNavbar } from '../navbar';
import { SideMenu } from '../ui';

interface Props {
   title: string;
   children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
   return (
      <>
         <Head>
            <title>{title}</title>
         </Head>

         <nav>
            <AuthNavbar pageTitle={title} />
         </nav>

         <SideMenu />

         <main>{children}</main>
      </>
   );
};
