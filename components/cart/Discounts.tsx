import { FC, useContext } from 'react';

import { CartContext } from '../../context';
import { currency } from '../../utils';

import styles from '../../styles/OrderSummary.module.css';

interface Props {
   orderItems?: number;
   orderPromo?: number;
}

export const Discounts: FC<Props> = ({ orderItems, orderPromo }) => {
   const { numberOfItems, discount } = useContext(CartContext);

   // TODO: probar bien esto
   if (!discount && !orderPromo) {
      return <></>;
   }

   const items = orderItems ? orderItems : numberOfItems;
   const promo = orderPromo ? orderPromo : discount;

   return (
      <>
         {items >= 28 && items < 56 && (
            <div className={styles.summary}>
               <span className={styles.discount}>Promo 28 platos o más (10%)</span>

               <span className={styles.discount}>-{currency.format(promo)}</span>
            </div>
         )}

         {items >= 56 && (
            <div className={styles.summary}>
               <span className={styles.discount}>Promo 56 platos o más (15%)</span>

               <span className={styles.discount}>{currency.format(promo)}</span>
            </div>
         )}
      </>
   );
};
