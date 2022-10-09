import React from 'react';
import Link from 'next/link';

import { AiOutlineRight } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';

import styles from '../../styles/Checkout.module.css';

export const Promos = () => {
   return (
      <Link href='/checkout/promociones'>
         <div className={styles.discounts}>
            <div className={styles.info}>
               <TbDiscount2 className={styles.iconDiscount} />
               <p className={styles.text}>Ver Descuentos disponibles</p>
               <AiOutlineRight className={styles.iconRight} />
            </div>
         </div>
      </Link>
   );
};
