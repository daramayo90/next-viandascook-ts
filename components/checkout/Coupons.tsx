import { ChangeEvent, useState, useContext } from 'react';
import { CartContext } from '../../context';

import styles from '../../styles/CheckoutSummary.module.css';

export const Coupons = () => {
   const { addCoupon } = useContext(CartContext);

   const [hasCoupon, setHasCoupon] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const handleCoupon = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const couponCode = e.target.coupon.value;

      const { coupon, error } = await addCoupon(couponCode);

      if (error) {
         setErrorMsg('Código no válido');
         return;
      }

      setHasCoupon(false);
      setErrorMsg('');
   };

   return (
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
   );
};
