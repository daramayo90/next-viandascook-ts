import { GetServerSideProps, NextPage } from 'next';

import { AirplaneTicketOutlined } from '@mui/icons-material';

import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';

import { AdminLayout } from '../../../components/layouts';
import { OrderProducts, OrderCheckout, OrderAddress } from '../../../components/orders';

import styles from '../../../styles/Order.module.css';

interface Props {
   order: IOrder;
}

const AdminOrderPage: NextPage<Props> = ({ order }) => {
   return (
      <AdminLayout
         title={'Resumen del pedido'}
         subTitle={`#${order._id}`}
         icon={<AirplaneTicketOutlined />}>
         <section className={styles.order}>
            <div className={styles.container}>
               <div className={styles.summary}>
                  <OrderProducts order={order} repeat={false} />
               </div>

               <div className={styles.info}>
                  <OrderCheckout order={order} />

                  <OrderAddress order={order} />
               </div>
            </div>
         </section>
      </AdminLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
   const { id = '' } = query;

   const order = await dbOrders.getOrderById(id.toString());

   if (!order) {
      return {
         redirect: {
            destination: '/admin/orders',
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

export default AdminOrderPage;
