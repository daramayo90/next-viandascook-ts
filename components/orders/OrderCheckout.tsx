import { FC } from 'react';

import { IOrder } from '../../interfaces';
import { currency } from '../../utils';

import { Discounts } from '../cart';

import styles from '../../styles/Order.module.css';

interface Props {
   order: IOrder;
}

export const OrderCheckout: FC<Props> = ({ order }) => {
   const {
      numberOfItems,
      subTotal,
      discount = 0,
      couponDiscount,
      coupons = [],
      shipping,
      total,
   } = order;

   return (
      <section className={styles.checkout}>
         <h2 className={styles.title}>Detalles del pago</h2>

         <div className={styles.summary}>
            <span>N° de Viandas:</span>

            <span>
               {numberOfItems} {numberOfItems > 1 ? 'platos' : 'plato'}
            </span>
         </div>

         <div className={styles.summary}>
            <span>Subtotal:</span>

            <span>{currency.format(subTotal)}</span>
         </div>

         <Discounts orderItems={numberOfItems} orderPromo={discount} />

         {coupons && (
            <div className={styles.summary}>
               <span>
                  Cupón: <u>{coupons[0].code}</u>
               </span>

               <span className={styles.discount}>-{currency.format(couponDiscount!)}</span>
            </div>
         )}

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
