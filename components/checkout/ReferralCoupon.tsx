import { FC, useContext } from 'react';

import { CartContext } from '../../context';

import { currency } from '../../utils';

import { TiDelete } from 'react-icons/ti';

import styles from '../../styles/OrderSummary.module.css';

interface Props {
   orderReferralDiscount?: number;
}

export const ReferralCoupon: FC<Props> = ({ orderReferralDiscount }) => {
   const { referralCoupon, referralDiscount, removeReferralCoupon } = useContext(CartContext);

   const referralPoints = orderReferralDiscount ? orderReferralDiscount : referralDiscount;

   const onRemoveCoupon = () => {
      removeReferralCoupon();
   };

   console.log(referralDiscount);

   return (
      <>
         {referralPoints !== 0 && (
            <div className={styles.summary}>
               {orderReferralDiscount ? (
                  <span>Descuento por referido:</span>
               ) : (
                  <span>
                     Cupón invitado: <u className={styles.discount}>{referralCoupon}</u>
                     <TiDelete className={styles.delete} onClick={onRemoveCoupon} />
                  </span>
               )}

               <div className={styles.coupons}>
                  <span className={styles.discount}>-{currency.format(referralPoints!)}</span>
               </div>
            </div>
         )}
      </>
   );
};
