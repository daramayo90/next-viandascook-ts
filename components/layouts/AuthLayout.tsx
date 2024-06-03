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
            <meta name='description' content='Viandas Cook | Usuario' />

            <meta property='og:title' content={title} />
            <meta property='og:description' content='Administrar la cuenta de Viandas Cook' />
            <meta property='og:image' content='/logo/viandas-icon.png' />
            <meta property='og:url' content='https://www.viandascook.com' />
            <meta property='og:type' content='website' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={title} />
            <meta property='og:description' content='Administrar la cuenta de Viandas Cook' />
            <meta name='twitter:image' content='/logo/viandas-icon.png' />

            <meta name='viewport' content='width=device-width' />

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
