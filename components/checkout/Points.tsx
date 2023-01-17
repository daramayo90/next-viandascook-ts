import { useContext } from 'react';

import Link from 'next/link';

import { CartContext } from '../../context';

import { AiOutlineRight } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';

import styles from '../../styles/Checkout.module.css';

export const Points = () => {
   const { points } = useContext(CartContext);

   return (
      <Link href='/checkout/canjear-puntos'>
         <div className={styles.card}>
            <div className={styles.info}>
               <TbDiscount2 className={styles.iconDiscount} />
               {points !== 0 ? (
                  <p className={styles.text}>
                     Puntos usados: <u>{points}</u>
                  </p>
               ) : (
                  <p className={styles.text}>Canjear Puntos</p>
               )}
               <AiOutlineRight className={styles.iconRight} />
            </div>
         </div>
      </Link>
   );
};
