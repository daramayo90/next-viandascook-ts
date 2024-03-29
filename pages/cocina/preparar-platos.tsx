import { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import { viandasApi } from '../../axiosApi';

import { ViandasLayout } from '../../components/layouts';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/AdminLayout.module.css';

const DatePicker = dynamic(() => import('react-datepicker'), {
   ssr: false,
});

type IProduct = {
   name: string;
   quantity: number;
   image: string;
};

const PrepararPlatosPage: NextPage = () => {
   const [deliveryDate, setDeliveryDate] = useState<Date>();
   const [products, setProducts] = useState<IProduct[]>([]);

   registerLocale('es', es);

   const handleDateChange = (date: Date): void => {
      setDeliveryDate(date);
   };

   const handleDateSelect = async (date: Date) => {
      const { data } = await viandasApi.post<IProduct[]>('/admin/productsByDate', { date });
      setProducts(data);
   };

   return (
      <ViandasLayout title={'Preparar platos'}>
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

            {products && (
               <div className={styles.products}>
                  {products.map((product: IProduct) => (
                     <div key={product.name} className={styles.product}>
                        <article className={styles.card}>
                           <div className={styles.nextImage}>
                              <Image
                                 src={product.image}
                                 alt={product.name}
                                 width={600}
                                 height={600}
                                 priority={true}
                              />
                           </div>
                           <div className={styles.info}>
                              <div className={styles.name}>
                                 <span>{product.name}</span>
                              </div>
                              <div className={styles.quantity}>
                                 <span>Cantidad: {product.quantity}</span>
                              </div>
                           </div>
                        </article>
                     </div>
                  ))}
               </div>
            )}
         </section>
      </ViandasLayout>
   );
};

export default PrepararPlatosPage;
