import { useContext } from 'react';

import { CartContext } from '../../context';
import { currency } from '../../utils';

import styles from '../../styles/OrderSummary.module.css';

export const Discounts = () => {
   const { numberOfItems, discount } = useContext(CartContext);

   if (!discount) {
      return <></>;
   }

   return (
      <>
         {numberOfItems >= 28 && numberOfItems < 56 && (
            <div className={styles.summary}>
               <span className={styles.discount}>Promo 28 platos o más (10%)</span>

               <span className={styles.discount}>-{currency.format(discount)}</span>
            </div>
         )}

         {numberOfItems >= 56 && (
            <div className={styles.summary}>
               <span className={styles.discount}>Promo 56 platos o más (15%)</span>

               <span className={styles.discount}>{currency.format(discount)}</span>
            </div>
         )}
      </>
   );
};
