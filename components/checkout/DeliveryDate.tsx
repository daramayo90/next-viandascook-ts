import dynamic from 'next/dynamic';

import { TbTruckDelivery } from 'react-icons/tb';

import styles from '../../styles/Checkout.module.css';

const SelectDate = dynamic(() => import('./SelectDate').then((module) => module.SelectDate), {
   ssr: false,
});

export const DeliveryDate = () => {
   return (
      <div className={styles.card}>
         <div className={styles.info}>
            <TbTruckDelivery className={styles.iconDiscount} />
            <SelectDate />
         </div>
      </div>
   );
};
