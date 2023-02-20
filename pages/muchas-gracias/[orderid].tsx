import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

import { CartContext } from '../../context';
import { removeCookies } from '../../utils';

import { OrderLayout } from '../../components/layouts';
import { OrderProducts, OrderCheckout, OrderAddress } from '../../components/orders';
import { TransferTable } from '../../components/orders/TransferTable';
import { Button } from '../../components/ui';

import styles from '../../styles/Order.module.css';

interface Props {
   order: IOrder;
}

const ThankYouPage: NextPage<Props> = ({ order }) => {
   const { orderComplete } = useContext(CartContext);

   useEffect(() => {
      orderComplete();
      removeCookies();
   }, []);

   return (
      <OrderLayout title='Viandas Cook - ¡Muchas Gracias!'>
         <section className={styles.order}>
            <h1 style={{ textAlign: 'center', paddingTop: '5rem' }}>¡Muchas Gracias!</h1>

            <p style={{ textAlign: 'center' }}>
               Tu pedido #{' '}
               <strong>
                  <u>{order._id}</u>
               </strong>{' '}
               se recibió con éxito
            </p>
            <p style={{ textAlign: 'center' }}>A continuación podrás encontrar el detalle</p>

            {order.paymentMethod === 'efectivo' && (
               <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <strong>
                     Abonarás con <u>Efectivo</u> al momento de la entrega
                  </strong>
               </p>
            )}

            <TransferTable order={order} />

            {order.paymentMethod === 'mercadopago' && (
               <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <strong>
                     Abonaste con <u>Mercado Pago</u>
                  </strong>
               </p>
            )}

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

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
   const { status = '' } = query;
   const { orderid } = params as { orderid: string };

   const order = await dbOrders.getOrderById(orderid.toString());

   if (!order) {
      return {
         redirect: {
            destination: '/pedidos/historial',
            permanent: false,
         },
      };
   }

   // It means the payment method is Mercado Pago
   if (status === 'approved') {
      await dbOrders.payMpOrder(order._id!);
   }

   return {
      props: {
         order,
      },
   };
};

export default ThankYouPage;
