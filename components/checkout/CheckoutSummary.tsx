import { useContext } from 'react';
import { CartContext } from '../../context';
import { currency } from '../../utils';

import styles from '../../styles/CheckoutSummary.module.css';

export const CheckoutSummary = () => {
   const { numberOfItems, subTotal, shipping, total } = useContext(CartContext);

   return (
      <section className={styles.checkoutSummary}>
         {/* <h2 className={styles.title}>Total del Carrito</h2> */}

         <div className={styles.summary}>
            <span>N° de Viandas</span>

            <span>
               {numberOfItems} {numberOfItems > 1 ? 'platos' : 'plato'}
            </span>
         </div>

         <div className={styles.summary}>
            <span>Subtotal</span>

            <span>{currency.format(subTotal)}</span>
         </div>

         <div className={styles.summary}>
            <span>+28 viandas (10%)</span>

            <span className={styles.discount}>-$85,45</span>
         </div>

         <div className={styles.summary}>
            <span>Envío</span>

            {shipping === 0 ? <span>Gratis</span> : <span>{currency.format(shipping)}</span>}
         </div>

         {/* <div className={styles.summary}>
            <span>+14 viandas</span>

            <span className={styles.discount}>Envío Gratuito</span>
         </div> */}

         {/* <div className={styles.summary}>
            <span>Cupón (BIENVENIDO10)</span>

            <span className={styles.discount}>-$43,84</span>
         </div> */}

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
