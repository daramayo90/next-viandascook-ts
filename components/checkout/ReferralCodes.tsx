import { useContext } from 'react';

import Link from 'next/link';

import { CartContext } from '../../context';

import { AiOutlineRight } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';

import styles from '../../styles/Checkout.module.css';

export const ReferralCodes = () => {
   const { coupons, couponDiscount } = useContext(CartContext);

   return (
      <Link href='/checkout/referido'>
         <div className={styles.card}>
            <div className={styles.info}>
               <TbDiscount2 className={styles.iconDiscount} />
               {couponDiscount !== 0 ? (
                  <p className={styles.text}>
                     Cupón usado: <u>{coupons[0].code}</u>
                  </p>
               ) : (
                  <p className={styles.text}>¿Te invitó un amigo?</p>
               )}
               <AiOutlineRight className={styles.iconRight} />
            </div>
         </div>
      </Link>
   );
};
