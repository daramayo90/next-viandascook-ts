import { ChangeEvent, useState, useContext } from 'react';

import { CartContext } from '../../context';

import { currency } from '../../utils';

import { TiDelete } from 'react-icons/ti';

import styles from '../../styles/CheckoutSummary.module.css';

// TODO: Ver los errores from db
export const Coupons = () => {
   const { addCoupon, removeCoupon, coupons, couponsDiscount } = useContext(CartContext);

   const [hasCoupon, setHasCoupon] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const handleCoupon = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const couponCode = e.target.coupon.value;

      const { error } = await addCoupon(couponCode);

      if (error) return setErrorMsg('Código no válido');

      setHasCoupon(false);
      setErrorMsg('');
   };

   const onRemoveCoupon = () => {
      removeCoupon();
   };

   return (
      <div className={styles.summary}>
         {couponsDiscount === 0 ? (
            <>
               <span>¿Tenés un cupón?</span>

               <div className={styles.coupons}>
                  <span className={styles.pointer} onClick={() => setHasCoupon(!hasCoupon)}>
                     Agregar
                  </span>

                  {hasCoupon && (
                     <form className={styles.formCoupon} onSubmit={handleCoupon}>
                        <input type='text' name='coupon' placeholder='Código' />

                        <button className={styles.couponButton}>Aplicar cupón</button>

                        {errorMsg && <span>{errorMsg}</span>}
                     </form>
                  )}
               </div>
            </>
         ) : (
            <>
               <span>
                  Cupón: <u>{coupons[0].code}</u>
                  <TiDelete className={styles.delete} onClick={onRemoveCoupon} />
               </span>

               <div className={styles.coupons}>
                  <span className={styles.discount}>-{currency.format(couponsDiscount)}</span>
               </div>
            </>
         )}
      </div>
   );
};
