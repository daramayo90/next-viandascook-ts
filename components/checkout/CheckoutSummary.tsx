import { useContext, useState } from 'react';

import { CartContext } from '../../context';
import { currency } from '../../utils';

import { Discounts } from '../cart';
import { Coupons, RedeemPoints, ReferralCoupon } from './';

import styles from '../../styles/CheckoutSummary.module.css';

export const CheckoutSummary = () => {
   const { numberOfItems, numberOfPacks, subTotal, shipping, total } = useContext(CartContext);

   return (
      <section className={styles.checkoutSummary}>
         {numberOfItems > 0 && (
            <div className={styles.summary}>
               <span>N° de Viandas</span>

               <span>
                  {numberOfItems} {numberOfItems > 1 ? 'viandas' : 'vianda'}
               </span>
            </div>
         )}

         {numberOfPacks > 0 && (
            <div className={styles.summary}>
               <span>Cantidad de Packs</span>

               <span>
                  {numberOfPacks} {numberOfPacks > 1 ? 'packs' : 'pack'}
               </span>
            </div>
         )}

         <div className={styles.summary}>
            <span>Subtotal:</span>

            <span>{currency.format(subTotal)}</span>
         </div>

         <Discounts />

         <Coupons />

         <ReferralCoupon />

         <RedeemPoints />

         <div className={styles.summary}>
            <span>Envío:</span>

            {shipping === 0 ? <span>Gratis</span> : <span>{currency.format(shipping)}</span>}
         </div>

         <div className={`${styles.summary} ${styles.total}`}>
            <span>
               <strong>Total:</strong>
            </span>

            <span>
               <strong>{currency.format(total)}</strong>
            </span>
         </div>
      </section>
   );
};
