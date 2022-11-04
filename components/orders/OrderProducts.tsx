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

   const { orderItems } = order;
   const { repeatOrder } = useContext(CartContext);

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
