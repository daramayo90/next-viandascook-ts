import { useState } from 'react';
import { NextPage } from 'next';

import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import { IOrder } from '../../interfaces';

import { viandasApi } from '../../axiosApi';

import { ViandasLayout } from '../../components/layouts';
import { OrderCard, OrderDialog } from '../../components/admin';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/AdminLayout.module.css';

const PrepararPedidosPage: NextPage = () => {
   const [deliveryDate, setDeliveryDate] = useState<Date>();
   const [orders, setOrders] = useState<IOrder[]>([]);
   const [order, setOrder] = useState<IOrder>();
   const [showOrder, setShowOrder] = useState<boolean>(false);

   registerLocale('es', es);

   const handleDateChange = (date: Date): void => {
      setDeliveryDate(date);
   };

   const handleDateSelect = async (date: Date) => {
      const { data } = await viandasApi.post<IOrder[]>('/admin/ordersByDate', { date });
      setOrders(data);
   };

   return (
      <>
         <ViandasLayout title={'Preparar pedidos'}>
            <section className={styles.cooking}>
               <p className={styles.title}>Elegir la fecha de entrega del pedido</p>
               <div className={styles.container}>
                  <div className={styles.card}>
                     <div className={styles.dateInput}>
                        <DatePicker
                           // inline
                           fixedHeight
                           locale='es'
                           dateFormat='dd/MM/yyyy'
                           placeholderText='Elegir fecha'
                           shouldCloseOnSelect={true}
                           autoFocus={false}
                           calendarStartDay={0}
                           selected={deliveryDate}
                           onChange={handleDateChange} //only when value has changed
                           onSelect={handleDateSelect} //when day is clicked
                        />
                     </div>
                  </div>
               </div>

               {orders && (
                  <div className={styles.orders}>
                     {orders.map((order: IOrder) => (
                        <OrderCard
                           key={order._id}
                           order={order}
                           setOrder={setOrder}
                           setShowOrder={setShowOrder}
                        />
                     ))}
                  </div>
               )}
            </section>
         </ViandasLayout>

         {showOrder && <OrderDialog order={order} setShowOrder={setShowOrder} />}
      </>
   );
};

export default PrepararPedidosPage;
