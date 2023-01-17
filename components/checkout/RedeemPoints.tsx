import { FC, useContext } from 'react';

import { CartContext } from '../../context';
import { currency } from '../../utils';

import styles from '../../styles/OrderSummary.module.css';

interface Props {
   orderItems?: number;
   orderPromo?: number;
}

export const RedeemPoints: FC<Props> = ({ orderItems, orderPromo }) => {
   const { points, pointsDiscount } = useContext(CartContext);

   return (
      <>
         {points !== 0 && (
            <div className={styles.summary}>
               <span>
                  Puntos usados: <u className={styles.discount}>{points}</u>
               </span>

               <span className={styles.discount}>-{currency.format(pointsDiscount!)}</span>
            </div>
         )}
      </>
   );
};
