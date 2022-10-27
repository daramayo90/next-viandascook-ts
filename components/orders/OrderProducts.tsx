import React, { FC } from 'react';

import { IOrder } from '../../interfaces';

import styles from '../../styles/Order.module.css';
import { CartList } from '../cart';

interface Props {
   order: IOrder;
}

export const OrderProducts: FC<Props> = ({ order }) => {
   const { orderItems } = order;

   return (
      <section className={styles.products}>
         <h2 className={styles.title}>Viandas</h2>

         <CartList items={orderItems} />
      </section>
   );
};
