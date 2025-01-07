import { FC, useContext } from 'react';

import { CartContext } from '../../context';
import { currency } from '../../utils';

import styles from '../../styles/OrderSummary.module.css';

interface Props {
   orderItems?: number;
   orderPromo?: number;
   cashPayment?: number;
   showNoCash?: boolean;
}

export const Discounts: FC<Props> = ({ orderItems, orderPromo, cashPayment, showNoCash }) => {
   const { numberOfItems, discount, cashDiscount, paymentMethod } = useContext(CartContext);

   // TODO: probar bien esto
   // if (!discount && !orderPromo) {
   //    return <></>;
   // }

   const items = orderItems ? orderItems : numberOfItems;
   const promo = orderPromo ? orderPromo : discount;
   const cash = cashPayment ? cashPayment : cashDiscount;

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

               <span className={styles.discount}>-{currency.format(promo)}</span>
            </div>
         )}

         {!showNoCash && (paymentMethod === 'efectivo' || cashPayment) && (
            <div className={styles.summary}>
               <span className={styles.discount}>Descuento en efectivo (5%)</span>

               <span className={styles.discount}>-{currency.format(cash!)}</span>
            </div>
         )}
      </>
   );
};
