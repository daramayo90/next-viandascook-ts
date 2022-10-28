import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { IOrder } from '../../interfaces';
import { currency } from '../../utils';

import { AiFillCheckCircle } from 'react-icons/ai';

import styles from '../../styles/OrdersHistory.module.css';

interface Props {
   order: IOrder;
}

export const OrderCard: FC<Props> = ({ order }) => {
   const router = useRouter();

   const [selected, setSelected] = useState(false);

   const navigate = () => {
      setSelected(true);

      const id = JSON.parse(JSON.stringify(order._id));

      console.log(id);

      router.push(`/pedidos/${id}`);
   };

   return (
      <div className={selected ? `${styles.order} selected` : ` ${styles.order}`}>
         <div className={styles.card} onClick={navigate}>
            <div className={styles.top}>
               <span className={styles.number}>
                  {`Pedido #${
                     order._id!.length > 12 ? order._id!.substring(0, 12) + '...' : order._id
                  }`}
               </span>

               <span className={styles.date}>25/10/2022</span>
            </div>

            <div className={styles.bottom}>
               <span>
                  {order.numberOfItems}
                  {order.numberOfItems > 1 ? ' platos comprados' : ' plato comprado'}
               </span>

               <span>{currency.format(order.total)}</span>

               <span>
                  {order.shippingAddress.address}, {order.shippingAddress.address2},{' '}
                  {order.shippingAddress.city}
               </span>
            </div>

            <div className={styles.confirm}>
               <AiFillCheckCircle className={styles.icon} />
            </div>
         </div>
      </div>
   );
};
