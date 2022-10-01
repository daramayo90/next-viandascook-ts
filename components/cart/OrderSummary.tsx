import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { currency } from '../../utils';

import styles from '../../styles/OrderSummary.module.css';
import { Button } from '../ui';

interface Props {
   orderValues?: {
      numberOfItems: number;
      subTotal: number;
      total: number;
   };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
   const { numberOfItems, subTotal, total } = useContext(CartContext);

   const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total };

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

         {/* TODO: Calcular envío */}
         <div className={styles.summary}>
            <span>Envío</span>

            <span className={styles.shipping}>Calcular envío</span>
         </div>

         <div className={styles.summary}>
            <span>
               <strong>Total:</strong>
            </span>

            <span>
               <strong>{currency.format(summaryValues.total)}</strong>
            </span>
         </div>

         <div className={styles.checkoutButton}>
            <Button
               href='/finalizar-compra'
               content='Finalizar'
               background='var(--black)'
               color='var(--white)'
            />
         </div>
      </section>
   );
};
