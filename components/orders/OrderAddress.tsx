import { FC } from 'react';
import { AiOutlineCalendar, AiOutlineUser, AiOutlineWhatsApp } from 'react-icons/ai';
import { FaRegAddressCard } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

import { IOrder, IUser, ShippingAddress } from '../../interfaces';

import styles from '../../styles/Order.module.css';

interface Props {
   order: IOrder;
}

export const OrderAddress: FC<Props> = ({ order }) => {
   const { name, lastName, email, phone, dni } = order.user as IUser;

   const { address, address2, city2 } = order.shippingAddress as ShippingAddress;

   const { deliveryDate } = order;

   const [year, month, dayToSplit] = deliveryDate.toString().split('-');
   const [day] = dayToSplit.split('T');

   return (
      <section className={styles.address}>
         <h2 className={styles.title}>Detalles de la entrega</h2>

         {/* Client info */}
         <div className={styles.summary}>
            <AiOutlineUser className={styles.icon} />

            <p className={styles.text}>
               {name} {lastName}
            </p>
         </div>

         <div className={styles.summary}>
            <FiMail className={styles.icon} />

            <p className={styles.text}>{email}</p>
         </div>

         <div className={styles.summary}>
            <AiOutlineWhatsApp className={styles.icon} />

            <p className={styles.text}>{phone}</p>
         </div>

         <div className={styles.summary}>
            <FaRegAddressCard className={styles.icon} />

            <p className={styles.text}>{dni}</p>
         </div>

         {/* Shipping info */}
         <div className={styles.summary}>
            <AiOutlineCalendar className={styles.icon} />

            <p className={styles.text}>Entrega el día {`${day}/${month}/${year}`}</p>
         </div>

         <div className={styles.summary}>
            <GoLocation className={styles.icon} />

            <p className={styles.text}>
               {address}, Depto: {address2}, {city2}
            </p>
         </div>
      </section>
   );
};
