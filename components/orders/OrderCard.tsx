import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { IOrder, ShippingAddress } from '../../interfaces';
import { currency } from '../../utils';

import { AiFillCheckCircle } from 'react-icons/ai';

import styles from '../../styles/OrdersHistory.module.css';

interface Props {
   order: IOrder;
}

export const OrderCard: FC<Props> = ({ order }) => {
   const router = useRouter();

   const [selected, setSelected] = useState(false);

   const { address, address2, city } = order.shippingAddress as ShippingAddress;
   const { _id, numberOfItems, total, deliveryDate, createdAt } = order;

   const [date] = createdAt!.split('T');

   const [year, month, day] = date.split('-');

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
                  {`Pedido #${_id!.length > 12 ? _id!.substring(0, 12) + '...' : _id}`}
               </span>

               <span className={styles.date}>{`${day}/${month}/${year}`}</span>
            </div>

            <div className={styles.bottom}>
               <span>
                  {numberOfItems}
                  {numberOfItems > 1 ? ' platos comprados' : ' plato comprado'}
               </span>

               <span>{currency.format(total)}</span>

               <span>Fecha Entrega: {deliveryDate}</span>
            </div>

            <div className={styles.confirm}>
               <AiFillCheckCircle className={styles.icon} />
            </div>
         </div>
      </div>
   );
};
