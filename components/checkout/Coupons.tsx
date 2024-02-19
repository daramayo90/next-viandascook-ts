import { ChangeEvent, useState, useContext } from 'react';

import { CartContext } from '../../context';

import { currency } from '../../utils';
import { SubmitButton } from '../ui';

import { TiDelete } from 'react-icons/ti';

import styles from '../../styles/CheckoutSummary.module.css';

// TODO: Ver los errores from db
export const Coupons = () => {
   const { addCoupon, removeCoupon, coupons, couponDiscount } = useContext(CartContext);

   const [hasCoupon, setHasCoupon] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const handleCoupon = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsClicked(true);

      const couponCode = e.target.coupon.value;

      console.log(couponCode.toLowerCase());

      const { error, msg } = await addCoupon(couponCode.toLowerCase());

      if (error) {
         setIsClicked(false);
         return setErrorMsg(msg!);
      }

      setHasCoupon(false);
      setIsClicked(false);
      setErrorMsg('');
   };

   const onHasCoupon = () => {
      setHasCoupon(!hasCoupon);
      if (!hasCoupon) setErrorMsg('');
   };

   const onRemoveCoupon = () => {
      removeCoupon();
   };

   return (
      <div className={styles.summary}>
         {couponDiscount === 0 ? (
            <>
               <span>¿Tenés un cupón?</span>

               <div className={styles.coupons}>
                  <span className={styles.pointer} onClick={onHasCoupon}>
                     {!hasCoupon ? 'Agregar' : 'Cerrar'}
                  </span>

                  {hasCoupon && (
                     <form className={styles.formCoupon} onSubmit={handleCoupon}>
                        <input type='text' name='coupon' placeholder='Código' />

                        <div className={styles.couponButton}>
                           <SubmitButton content='Aplicar' isClicked={isClicked} />
                        </div>

                        {errorMsg && <span className={styles.error}>{errorMsg}</span>}
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
                  <span className={styles.discount}>-{currency.format(couponDiscount)}</span>
               </div>
            </>
         )}
         {/* {couponDiscount !== 0 && (
            <>
               <span>
                  Cupón: <u>{coupons[0].code}</u>
                  <TiDelete className={styles.delete} onClick={onRemoveCoupon} />
               </span>

               <div className={styles.coupons}>
                  <span className={styles.discount}>-{currency.format(couponDiscount)}</span>
               </div>
            </>
         )} */}
      </div>
   );
};
