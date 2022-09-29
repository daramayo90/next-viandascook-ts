import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { NavbarAuth } from '../ui';

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
            <NavbarAuth />
         </nav>

         <main>{children}</main>
      </>
   );
};
