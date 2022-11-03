import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { IOrder } from '../../interfaces';

import { SideMenu, TabMenu } from '../ui';
import { OrderNavbar } from '../navbar';

interface Props {
   children: ReactNode;
   title: string;
   order?: IOrder;
}

export const OrderLayout: FC<Props> = ({ children, title, order }) => {
   const router = useRouter();
   const path = router.asPath;
   let pageTitle = '';

   if (path === '/pedidos/historial') {
      pageTitle = 'Historial';
   } else {
      pageTitle = `Pedido #${order?._id}`;
   }

   return (
      <>
         <Head>
            <title>{title}</title>

            <meta name='og:title' content={title} />
            <meta name='viewport' content='width=device-width, user-scalable=no' />
         </Head>

         <nav>
            <OrderNavbar pageTitle={pageTitle} />
         </nav>

         <SideMenu />

         <main>{children}</main>

         <TabMenu />
      </>
   );
};
