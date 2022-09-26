import { useContext, useState } from 'react';
import Link from 'next/link';

import { CartContext } from '../../context';

import { IoIosClose } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import styles from '../../styles/CartMenu.module.css';

export const CartMenu = () => {
   const { numberOfItems } = useContext(CartContext);
   const [touched, setTouched] = useState(false);

   return (
      <div className={styles.cartMenu} onClick={() => setTouched(!touched)}>
         <div className={styles.line}>
            <AiOutlineMinus className={styles.icon} />
         </div>

         <div className={styles.container}>
            <div className={styles.items}>
               <FiShoppingCart className={styles.icon} />
               <span className={styles.quantity}>{numberOfItems}</span>
            </div>

            <Link href='/direccion'>
               <div className={styles.linkTo}>
                  <BsFillArrowRightCircleFill className={styles.icon} />
               </div>
            </Link>
         </div>

         <span style={{ color: 'green' }}>Descuento acumulado</span>

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

               <div className={styles.selectedMeals}></div>
            </div>
         )}
      </div>
   );
};
