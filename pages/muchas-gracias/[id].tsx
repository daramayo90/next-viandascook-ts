import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

import { dbOrders } from '../../database';
import { IOrder, IUser } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/Order.module.css';
import { OrderProducts, OrderCheckout, OrderAddress } from '../../components/orders';

interface Props {
   order: IOrder;
}

const ThankYouPage: NextPage<Props> = ({ order }) => {
   return (
      <ShopLayout title='¡Muchas Gracias!' pageDescription={''}>
         <section className={styles.order}>
            <div className={styles.container}>
               <OrderProducts order={order} />

               <OrderCheckout order={order} />

               <OrderAddress order={order} />
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
   const { id = '' } = query;

   const session: any = await unstable_getServerSession(req, res, authOptions);

   // TODO: Probar esta redirección
   // if (!session) {
   //    return {
   //       redirect: {
   //          destination: `/auth/login?page=/pedidos/${id}`,
   //          permanent: false,
   //       },
   //    };
   // }

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
   //  const { email = '' } = order.user as IUser;

   //  if (email !== session!.user.email) {
   //     return {
   //        redirect: {
   //           destination: `/auth/login?page=/pedidos/${id}`,
   //           permanent: false,
   //        },
   //     };
   //  }

   return {
      props: {
         order,
      },
   };
};

export default ThankYouPage;
