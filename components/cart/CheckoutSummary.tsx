import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { currency } from '../../utils';

import styles from '../../styles/CheckoutSummary.module.css';

interface Props {
   orderValues?: {
      numberOfItems: number;
      subTotal: number;
      total: number;
   };
}

export const CheckoutSummary: FC<Props> = ({ orderValues }) => {
   const { numberOfItems, subTotal, total } = useContext(CartContext);

   const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total };

   return (
      <section className={styles.checkoutSummary}>
         {/* <h2 className={styles.title}>Total del Carrito</h2> */}

         <div className={styles.summary}>
            <span>N° de Viandas</span>

            <span>
               {summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'platos' : 'plato'}
            </span>
         </div>

         <div className={styles.summary}>
            <span>Subtotal</span>

            <span>{currency.format(summaryValues.subTotal)}</span>
         </div>

         {/* TODO: Calcular envío */}
         <div className={styles.summary}>
            <span>Envío</span>

            <span>Gratis</span>
         </div>

         <div className={styles.summary}>
            <span>+14 viandas</span>

            <span className={styles.discount}>Envío Gratuito</span>
         </div>

         <div className={styles.summary}>
            <span>+28 viandas (10%)</span>

            <span className={styles.discount}>-$85,45</span>
         </div>

         <div className={styles.summary}>
            <span>Cupón (BIENVENIDO10)</span>

            <span className={styles.discount}>-$43,84</span>
         </div>

         <div className={`${styles.summary} ${styles.total}`}>
            <span>
               <strong>Total:</strong>
            </span>

            <span>
               <strong>{currency.format(summaryValues.total)}</strong>
            </span>
         </div>
      </section>
   );
};
