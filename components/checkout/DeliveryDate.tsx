import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';
import styles from '../../styles/Checkout.module.css';

export const DeliveryDate = () => {
   return (
      <Link href='/checkout/delivery'>
         <div className={styles.discounts}>
            <div className={styles.info}>
               <TbTruckDelivery className={styles.iconDiscount} />
               <p className={styles.text}>Seleccionar Fecha de Entrega</p>
               <AiOutlineRight className={styles.iconRight} />
            </div>
         </div>
      </Link>
   );
};
