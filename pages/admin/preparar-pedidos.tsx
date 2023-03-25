import { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import { viandasApi } from '../../axiosApi';

import { AdminLayout } from '../../components/layouts';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/AdminLayout.module.css';

type IOrder = {
   _id: string;
   user: {
      _id: string;
      name: string;
      lastName: string;
      email: string;
      phone: string;
      dni: string;
   };
   orderItems: [
      {
         _id: string;
         image: string;
         name: string;
         price: number;
         quantity: number;
      },
   ];
   numberOfItems: number;
};

const PrepararPedidosPage: NextPage = () => {
   const [deliveryDate, setDeliveryDate] = useState<Date>();
   const [orders, setOrders] = useState<IOrder[]>([]);

   registerLocale('es', es);

   const handleDateChange = (date: Date): void => {
      setDeliveryDate(date);
   };

   const handleDateSelect = async (date: Date) => {
      const { data } = await viandasApi.post<IOrder[]>('/admin/ordersByDate', { date });
      setOrders(data);
   };

   return (
      <AdminLayout title={'Preparar pedidos'} subTitle={''}>
         <section className={styles.cooking}>
            <p className={styles.title}>Elegir la fecha de entrega del pedido</p>
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

            {orders && (
               <div className={styles.orders}>
                  {orders.map((order: IOrder) => (
                     <div key={order._id} className={styles.order}>
                        <article className={styles.card}>
                           <div className={styles.info}>
                              <span>
                                 <strong>{order._id}</strong> # {order.user.name}{' '}
                                 {order.user.lastName}
                              </span>
                           </div>
                           <div className={styles.numberOfItems}>
                              <span>
                                 Cantidad de viandas: <strong>{order.numberOfItems}</strong>
                              </span>
                           </div>
                        </article>
                     </div>
                  ))}
               </div>
            )}
         </section>
      </AdminLayout>
   );
};

export default PrepararPedidosPage;
