import React, { FC, useContext } from 'react';

import { IOrder } from '../../interfaces';

import { CartList } from '../cart';
import { CartContext } from '../../context/cart';

import styles from '../../styles/Order.module.css';
import { useRouter } from 'next/router';

interface Props {
   order: IOrder;
}

export const OrderProducts: FC<Props> = ({ order }) => {
   const router = useRouter();

   const { orderItems, createdAt } = order;
   const { repeatOrder } = useContext(CartContext);

   console.log(order.createdAt);

   const [date] = createdAt!.split('T');

   const [year, month, day] = date.split('-');

   console.log(year); // 👉️ 09
   console.log(month); // 👉️ 24
   console.log(day); // 👉️ 2022

   const onRepeatOrder = () => {
      repeatOrder(orderItems);
      router.push('/cart');
   };

   return (
      <section className={styles.products}>
         <h2 className={styles.title}>Viandas</h2>

         <button className={styles.repeatBtn} onClick={onRepeatOrder}>
            Repetir Orden
         </button>

         <CartList items={orderItems} />
      </section>
   );
};
