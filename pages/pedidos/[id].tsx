import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]';

import { dbOrders } from '../../database';
import { IOrder, IUser } from '../../interfaces';

import { OrderLayout } from '../../components/layouts';
import { OrderAddress, OrderCheckout, OrderProducts, TransferTable } from '../../components/orders';

import styles from '../../styles/Order.module.css';

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
   return (
      <OrderLayout title={'Viandas Cook - Pedido'} order={order}>
         <section className={styles.order}>
            <TransferTable order={order} />

            <div className={styles.container}>
               <div className={styles.summary}>
                  <OrderProducts order={order} />
               </div>

               <div className={styles.info}>
                  <OrderCheckout order={order} />

                  <OrderAddress order={order} />
               </div>
            </div>
         </section>
      </OrderLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
   const { id = '' } = query;

   const session: any = await unstable_getServerSession(req, res, authOptions);

   const order = await dbOrders.getOrderById(id.toString());

   if (!order) {
      return {
         redirect: {
            destination: '/pedidos/historial',
            permanent: false,
         },
      };
   }

   // TODO: Ver el tema de la compra de un usuario guest, cómo se guarda cuando se loguea por primera vez luego de la compra?
   // La redirección debe ser a otra página
   const { email = '' } = order.user as IUser;

   if (email !== session!.user.email) {
      return {
         redirect: {
            destination: `/auth/login?page=/pedidos/${id}`,
            permanent: false,
         },
      };
   }

   return {
      props: {
         order,
      },
   };
};

export default OrderPage;
