import { useContext } from 'react';

import Link from 'next/link';

import { AiOutlineRight } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';
import { CartContext } from '../../context';

import styles from '../../styles/Checkout.module.css';

export const Promos = () => {
   const { coupons, couponDiscount } = useContext(CartContext);

   return (
      <Link href='/checkout/promociones'>
         <div className={styles.discounts}>
            <div className={styles.info}>
               <TbDiscount2 className={styles.iconDiscount} />
               {couponDiscount !== 0 ? (
                  <p className={styles.text}>
                     Cupón usado: <u>{coupons[0].code}</u>
                  </p>
               ) : (
                  <p className={styles.text}>Ver descuentos disponibles</p>
               )}
               <AiOutlineRight className={styles.iconRight} />
            </div>
         </div>
      </Link>
   );
};
