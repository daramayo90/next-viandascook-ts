import { useContext } from 'react';

import Link from 'next/link';

import { UIContext } from '../../context';
import { CartList } from '../cart';

import { MdModeEdit } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';

import styles from '../../styles/SideProductsMenu.module.css';

export const SideProductsMenu = () => {
   const { isProductsMenuOpen, toggleProductsMenu } = useContext(UIContext);

   return (
      <section className={isProductsMenuOpen ? `${styles.menu} ${styles.open}` : `${styles.menu}`}>
         <div className={isProductsMenuOpen ? `${styles.cont} ${styles.open}` : `${styles.cont}`}>
            <div className={styles.fullMenu}>
               <div className={styles.top}>
                  <div className={styles.title}>
                     <h4>Productos elegidos</h4>
                  </div>

                  <div className={styles.closeMenu} onClick={toggleProductsMenu}>
                     <IoIosClose className={styles.icon} />
                  </div>
               </div>

               <Link href='/cart'>
                  <div className={styles.edit}>
                     <MdModeEdit className={styles.editIcon} />
                     <span>Modificar carrito</span>
                  </div>
               </Link>

               <CartList />
            </div>
         </div>
      </section>
   );
};
