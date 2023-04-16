/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

import { CartContext, OrdersContext, EmailsContext } from '../../context';
import { ga, removeCookies } from '../../utils';

import { OrderLayout } from '../../components/layouts';
import { OrderProducts, OrderCheckout, OrderAddress } from '../../components/orders';
import { TransferTable } from '../../components/orders/TransferTable';
import { Button } from '../../components/ui';

import styles from '../../styles/Order.module.css';

interface Props {
   order: IOrder;
}

const ThankYouPage: NextPage<Props> = ({ order }) => {
   const { referralCoupon, orderComplete } = useContext(CartContext);
   const { addReferralPoints, orderToSpreadsheet } = useContext(OrdersContext);
   const { sendOrderConfirmationEmail, sendWireTransferInfo } = useContext(EmailsContext);

   const { _id, paymentMethod, total } = order;

   const onPurchaseEvent = () => {
      ga.event({
         action: 'purchase',
         category: 'Purchase',
         label: _id!.toString(),
         value: total,
         params: {
            user: order.user,
            items: order.orderItems,
            numberOfItems: order.numberOfItems,
            coupons: order.coupons,
            method: paymentMethod,
         },
      });
   };

   useEffect(() => {
      const alreadyExecuted = sessionStorage.getItem(`effectExecuted ${_id}`);

      const onOrderComplete = async () => {
         if (referralCoupon) await addReferralPoints(referralCoupon);
         if (paymentMethod === 'transferencia') await sendWireTransferInfo(order);
         onPurchaseEvent();
         await sendOrderConfirmationEmail(order);
         await orderToSpreadsheet();
      };

      if (!alreadyExecuted) {
         onOrderComplete();
         sessionStorage.setItem(`effectExecuted ${_id}`, true.toString());
      }

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
   const { viandasToken = '', status = '' } = query as { viandasToken: string; status: string };
   const { orderid } = params as { orderid: string };

   const order = await dbOrders.getOrderById(orderid.toString());

   const isValidToken = await dbOrders.verifyToken(orderid, viandasToken);

   if (!isValidToken) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }

   if (!order) {
      return {
         redirect: {
            destination: '/pedidos/historial',
            permanent: false,
         },
      };
   }

   // status === 'approved' means the payment method is Mercado Pago
   if (order.paymentMethod !== 'mercadopago' || status === 'approved') {
      await dbOrders.payOrder(order._id!);
   }

   return {
      props: {
         order,
      },
   };
};

export default ThankYouPage;
