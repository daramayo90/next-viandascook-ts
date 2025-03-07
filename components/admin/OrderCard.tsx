import { FC } from 'react';
import { IOrder, IUser } from '../../interfaces';

import styles from '../../styles/AdminLayout.module.css';
import viandasApi from '../../axiosApi/viandasApi';

interface Props {
   order: IOrder;
   setOrder: (value: IOrder) => void;
   setShowOrder: (value: boolean) => void;
}

export const OrderCard: FC<Props> = ({ order, setOrder, setShowOrder }) => {
   const { name, lastName } = order.user as IUser;

   const totalQuantityOfItems = order.orderItems.reduce((acc, item) => {
      const productsInPackQuantity =
         item.productsInPack?.reduce((packAcc, packItem) => packAcc + packItem.quantity, 0) || 0;
      return productsInPackQuantity > 0
         ? acc + item.quantity + productsInPackQuantity - 1
         : acc + item.quantity + productsInPackQuantity;
   }, 0);

   const openOrder = async (orderId: number) => {
      const { data } = await viandasApi.get('/admin/ordersByDate', { params: { orderId } });
      setOrder(data);
      setShowOrder(true);
   };

   return (
      <div key={order._id} className={styles.order} onClick={() => openOrder(order._id!)}>
         <article className={styles.card}>
            <div className={styles.info}>
               <span>
                  <strong>{order._id}</strong> # {name} {lastName}
               </span>
            </div>
            <div className={styles.numberOfItems}>
               <span>
                  Cantidad de viandas: <strong>{totalQuantityOfItems}</strong>
               </span>
            </div>
         </article>
      </div>
   );
};
