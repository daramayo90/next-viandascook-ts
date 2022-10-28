import { NextPage } from 'next';
import { OrderLayout } from '../../components/layouts';

import styles from '../../styles/OrdersHistory.module.css';

interface Props {}

const OrderHistoryPage: NextPage<Props> = () => {
   return (
      <OrderLayout title={'Historial de Pedidos'}>
         <section className={styles.history}>
            <div className={styles.container}>
               <div className={styles.order}>
                  <div className={styles.card}></div>
               </div>
            </div>
         </section>
      </OrderLayout>
   );
};

export default OrderHistoryPage;
