import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { IOrder, IOrderItem, IProduct } from '../../interfaces';

import { CartList } from '../cart';
import { CartContext } from '../../context/cart';

import styles from '../../styles/Order.module.css';
import { viandasApi } from '../../axiosApi';

interface Props {
   order: IOrder;
   repeat?: boolean;
}

export const OrderProducts: FC<Props> = ({ order, repeat = true }) => {
   const router = useRouter();

   const { orderItems } = order;
   const { repeatOrder } = useContext(CartContext);

   const onRepeatOrder = async () => {
      const productIds = orderItems.map((item) => item._id);

      const { data: products } = await viandasApi.get<IProduct[]>('/products', {
         params: { ids: productIds },
      });

      const orderItemsMap = orderItems.reduce((acc: { [key: string]: IOrderItem }, item) => {
         acc[item._id] = item;
         return acc;
      }, {});

      const cartProducts = products.map((product: IProduct) => {
         const quantity = orderItemsMap[product._id].quantity;

         return {
            _id: product._id.toString(),
            image: product.image,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity,
         };
      });

      repeatOrder(cartProducts);
      setTimeout(() => router.push('/cart'), 2000);
   };

   return (
      <section className={styles.products}>
         <h2 className={styles.title}>Viandas</h2>

         {repeat && (
            <button className={styles.repeatBtn} onClick={onRepeatOrder}>
               Repetir Orden
            </button>
         )}

         <CartList items={orderItems} />
      </section>
   );
};
