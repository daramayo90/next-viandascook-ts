import { useContext } from 'react';

import { useOrderSummaryts } from '../../hooks';
import { CartContext } from '../../context';

import { SubmitButton } from '../ui';
import { currency } from '../../utils';

import { Shipping } from './';

import styles from '../../styles/OrderSummary.module.css';
import { Discounts } from './Discounts';

// interface Props {
//    orderValues?: {
//       numberOfItems: number;
//       subTotal: number;
//       total: number;
//    };
// }

export const OrderSummary = () => {
   const { submitErrors, summaryValues, handleSubmit } = useOrderSummaryts();
   const { numberOfItems, discount } = useContext(CartContext);

   return (
      <section className={styles.orderSummary}>
         <h2 className={styles.title}>Total del Carrito</h2>

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

         <Discounts />

         <div className={styles.summary}>
            <span>Envío</span>

            {numberOfItems >= 14 ? <span>Gratis</span> : <Shipping />}
         </div>

         <div className={styles.summary}>
            <span>
               <strong>Total:</strong>
            </span>

            <span>
               <strong>{currency.format(summaryValues.total)}</strong>
            </span>
         </div>

         <div className={styles.checkoutButton} onClick={handleSubmit}>
            <SubmitButton content='Finalizar' background='var(--black)' color='var(--white)' />
         </div>

         {submitErrors && (
            <span className={styles.error}>Calcular el envío antes de continuar</span>
         )}
      </section>
   );
};
