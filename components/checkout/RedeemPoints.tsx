import { FC, useContext } from 'react';

import { CartContext } from '../../context';
import { currency } from '../../utils';

import styles from '../../styles/OrderSummary.module.css';

interface Props {
   orderPointsDiscount?: number;
}

export const RedeemPoints: FC<Props> = ({ orderPointsDiscount }) => {
   const { points, pointsDiscount } = useContext(CartContext);

   const discountPoints = orderPointsDiscount ? orderPointsDiscount : pointsDiscount;

   return (
      <>
         {discountPoints !== 0 && (
            <div className={styles.summary}>
               {orderPointsDiscount ? (
                  <span>Descuento por puntos:</span>
               ) : (
                  <span>
                     Puntos usados: <u className={styles.discount}>{points}</u>
                  </span>
               )}

               <span className={styles.discount}>-{currency.format(discountPoints!)}</span>
            </div>
         )}
      </>
   );
};
