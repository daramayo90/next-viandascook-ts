import { useContext } from 'react';

import { CartContext } from '../../context';

import { currency } from '../../utils';

import { TiDelete } from 'react-icons/ti';

import styles from '../../styles/CheckoutSummary.module.css';

export const ReferralCoupon = () => {
   const { referralCoupon, referralDiscount, removeReferralCoupon } = useContext(CartContext);

   const onRemoveCoupon = () => {
      removeReferralCoupon();
   };

   return (
      <div className={styles.summary}>
         {referralCoupon && (
            <>
               <span>
                  Cupón invitado: <u>{referralCoupon}</u>
                  <TiDelete className={styles.delete} onClick={onRemoveCoupon} />
               </span>

               <div className={styles.coupons}>
                  <span className={styles.discount}>-{currency.format(referralDiscount)}</span>
               </div>
            </>
         )}
      </div>
   );
};
