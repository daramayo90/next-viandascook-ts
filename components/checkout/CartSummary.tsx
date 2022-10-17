import { useContext, useState } from 'react';

import { CartContext } from '../../context';

import { IoIosClose } from 'react-icons/io';
import { MdKeyboardArrowUp } from 'react-icons/md';

import { currency } from '../../utils';
import { CartList } from '../cart';

import styles from '../../styles/CartSummary.module.css';
import { AiFillEdit } from 'react-icons/ai';
import Link from 'next/link';

export const CartSummary = () => {
   const { numberOfItems, total } = useContext(CartContext);

   const [touched, setTouched] = useState(false);

   return (
      <>
         <div
            className={touched ? `${styles.cartSummary}` : `${styles.cartSummary} hide`}
            onClick={() => setTouched(!touched)}>
            <div className={styles.container}>
               <span className={styles.quantity}>
                  {numberOfItems > 1 ? `${numberOfItems} viandas` : `${numberOfItems} vianda`}
               </span>

               <div className={styles.info}>
                  <span className={styles.total}>{currency.format(total)}</span>
                  <span className={styles.details}>Ver el Detalle</span>
                  <MdKeyboardArrowUp className={styles.iconDetails} />
               </div>
            </div>
         </div>

         {touched && (
            <div className={styles.fullMenu}>
               <div className={styles.top}>
                  <div className={styles.title}>
                     <h4>Platos elegidos</h4>
                  </div>

                  <div className={styles.closeMenu} onClick={() => setTouched(!touched)}>
                     <IoIosClose className={styles.icon} />
                  </div>
               </div>

               <Link href='/cart'>
                  <div className={styles.edit}>
                     <AiFillEdit className={styles.editIcon} />
                     <span>Modificar carrito</span>
                  </div>
               </Link>

               <CartList />
            </div>
         )}
      </>
   );
};
