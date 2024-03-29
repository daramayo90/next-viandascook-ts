import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

import { OrderLayout } from '../../components/layouts';
import { OrderCard } from '../../components/orders';
import { Button } from '../../components/ui';

import styles from '../../styles/OrdersHistory.module.css';

interface Props {
   orders?: IOrder[];
}

const OrderHistoryPage: NextPage<Props> = ({ orders }) => {
   return (
      <OrderLayout title={'Historial de Pedidos | Viandas Cook'} noIndex>
         <section className={styles.history}>
            <div className={styles.container}>
               {orders?.length === 0 ? (
                  <div className={styles.noOrders}>
                     <h2 className={styles.title}>Todavía no realizaste ninguna compra</h2>
                     <span>Realizá tu primer pedido a continuación:</span>
                     <div className={styles.btn}>
                        <Button
                           href={'/menu'}
                           content={'Ver platos'}
                           background='var(--primary)'
                           border='none'
                        />
                     </div>
                  </div>
               ) : (
                  orders!.map((order) => <OrderCard key={order._id} order={order} />)
               )}
            </div>
         </section>
      </OrderLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const session: any = await getServerSession(req, res, authOptions);

   if (!session) {
      return {
         redirect: {
            destination: '/auth/login?page=/pedidos/historial',
            permanent: false,
         },
      };
   }

   const orders = await dbOrders.getOrdersByUser(session!.user.email);

   return {
      props: {
         orders,
      },
   };
};

export default OrderHistoryPage;
