import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { IOrder } from '../../interfaces';

import { SideMenu } from '../ui';
import { OrderNavbar } from '../navbar';

interface Props {
   children: ReactNode;
   title: string;
   order: IOrder;
}

export const OrderLayout: FC<Props> = ({ children, title, order }) => {
   return (
      <>
         <Head>
            <title>{title}</title>

            <meta name='og:title' content={title} />
            <meta name='viewport' content='width=device-width, user-scalable=no' />
         </Head>

         <nav>
            <OrderNavbar pageTitle={`Pedido #${order._id}`} />
         </nav>

         <SideMenu />

         <main>{children}</main>
      </>
   );
};
