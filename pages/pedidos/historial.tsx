import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

import { OrderLayout } from '../../components/layouts';
import { OrderCard } from '../../components/orders';
import { TabMenu } from '../../components/ui';

import styles from '../../styles/OrdersHistory.module.css';

interface Props {
   orders: IOrder[];
}

const OrderHistoryPage: NextPage<Props> = ({ orders }) => {
   return (
      <OrderLayout title={'Historial de Pedidos'}>
         <section className={styles.history}>
            <div className={styles.container}>
               {orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
               ))}
            </div>
         </section>

         <TabMenu />
      </OrderLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const session: any = await unstable_getServerSession(req, res, authOptions);

   if (!session) {
      return {
         redirect: {
            destination: '/auth/login?page/pedidos/historial',
            permanent: false,
         },
      };
   }

   const orders = await dbOrders.getOrdersByUser(session.user.email);

   return {
      props: {
         orders,
      },
   };
};

export default OrderHistoryPage;
