import { useContext } from 'react';

import Link from 'next/link';

import { CartContext } from '../../context';

import { AiOutlineRight } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';

import styles from '../../styles/Checkout.module.css';

export const Promos = () => {
   const { coupons, couponDiscount } = useContext(CartContext);

   return (
      <Link href='/checkout/promociones'>
         <div className={styles.card}>
            <div className={styles.info}>
               <TbDiscount2 className={styles.iconDiscount} />
               {couponDiscount !== 0 ? (
                  <p className={styles.text}>
                     Cupón usado: <u>{coupons[0].code}</u>
                  </p>
               ) : (
                  <div className={styles.text}>
                     <p>Ver descuentos disponibles</p>
                     <p className={styles.example}>Aquí podrás aplicar tu descuento</p>
                     <p className={styles.example}>Ejemplo: <strong>10% off en primera compra</strong></p>
                  </div>
               )}
               <AiOutlineRight className={styles.iconRight} />
            </div>
         </div>
      </Link>
   );
};
