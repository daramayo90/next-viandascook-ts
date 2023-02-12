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

   const { _id, numberOfItems, total, deliveryDate, createdAt } = order;

   const [year, month, dayToSplit] = deliveryDate.toString().split('-');
   const [day] = dayToSplit.split('T');

   const navigate = () => {
      setSelected(true);

      const id = JSON.parse(JSON.stringify(order._id));

      router.push(`/pedidos/${id}`);
   };

   return (
      <div className={selected ? `${styles.order} selected` : ` ${styles.order}`}>
         <div className={styles.card} onClick={navigate}>
            <div className={styles.top}>
               <span className={styles.number}>#{_id}</span>

               <span className={styles.date}>
                  {new Date(createdAt!).toLocaleDateString('es-AR')}
               </span>
            </div>

            <div className={styles.bottom}>
               <span>
                  {numberOfItems}
                  {numberOfItems > 1 ? ' platos comprados' : ' plato comprado'}
               </span>

               <span>{currency.format(total)}</span>

               <span>Fecha Entrega: {`${day}/${month}/${year}`}</span>
            </div>

            <div className={styles.confirm}>
               <AiFillCheckCircle className={styles.icon} />
            </div>
         </div>
      </div>
   );
};
