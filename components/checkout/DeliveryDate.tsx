import { SelectDate } from './';

import { TbTruckDelivery } from 'react-icons/tb';

import styles from '../../styles/Checkout.module.css';

export const DeliveryDate = () => {
   return (
      <div className={styles.delivery}>
         <div className={styles.info}>
            <TbTruckDelivery className={styles.iconDiscount} />
            <SelectDate />
         </div>
      </div>
   );
};
