import { GetServerSideProps, NextPage, NextApiRequest } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

import { OrderLayout } from '../../components/layouts';

import styles from '../../styles/Order.module.css';
import { OrderProducts, OrderCheckout, OrderAddress } from '../../components/orders';
import { Button } from '../../components/ui';

interface Props {
   order: IOrder;
}

const ThankYouPage: NextPage<Props> = ({ order }) => {
   return (
      <OrderLayout title='¡Muchas Gracias!'>
         <section className={styles.order}>
            <h1 style={{ textAlign: 'center', paddingTop: '5rem' }}>¡Muchas Gracias!</h1>

            <p style={{ textAlign: 'center' }}>Tu pedido se recibió con éxito</p>
            <p style={{ textAlign: 'center' }}>A continuación podrás encontrar el detalle</p>

            <div className={styles.container}>
               <div className={styles.summary}>
                  <OrderProducts order={order} repeat={false} />
               </div>

               <div className={styles.info}>
                  <OrderCheckout order={order} />

                  <OrderAddress order={order} />

                  <Button
                     href='/pedidos/historial'
                     content='Historial'
                     background='var(--primary)'
                  />
               </div>
            </div>
         </section>
      </OrderLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, params, query }) => {
   const { id = '', status = '', preference_id = '' } = query;
   const { orderid } = params as { orderid: string };

   let order;
   if (status === 'approved') {
      order = await dbOrders.createOrder(preference_id as string);
   } else {
      order = await dbOrders.getOrderById(id.toString());
   }

   // if (!order) {
   //    return {
   //       redirect: {
   //          destination: '/pedidos/historial',
   //          permanent: false,
   //       },
   //    };
   // }

   orderid.replace('orderid', JSON.parse(JSON.stringify(order!._id!)));

   return {
      props: {
         order,
      },
   };

   // const session: any = await unstable_getServerSession(req, res, authOptions);

   // TODO: Probar esta redirección
   // if (!session) {
   //    return {
   //       redirect: {
   //          destination: `/auth/login?page=/pedidos/${id}`,
   //          permanent: false,
   //       },
   //    };
   // }

   // TODO: Ver el tema de la compra de un usuario guest, cómo se guarda cuando se loguea por primera vez luego de la compra?
   // La redirección debe ser a otra página
   //  const { email = '' } = order.user as IUser;

   //  if (email !== session!.user.email) {
   //     return {
   //        redirect: {
   //           destination: `/auth/login?page=/pedidos/${id}`,
   //           permanent: false,
   //        },
   //     };
   //  }
};

export default ThankYouPage;
