import { useContext } from 'react';
import Link from 'next/link';

import { CartContext, UIContext } from '../../context';

import { HiOutlineMenu, HiOutlineShoppingBag } from 'react-icons/hi';

import styles from '../../styles/ShopNavbar.module.css';

export const ShopNavbar = () => {
   const { toggleSideMenu } = useContext(UIContext);
   const { numberOfItems } = useContext(CartContext);

   return (
      <section className={styles.shopNavbar}>
         <div className={styles.container}>
            <Link href='/'>
               <div className={styles.brand}>
                  <span>Viandas Cook</span>
               </div>
            </Link>

            <div className={styles.items}>
               <Link href='/cart'>
                  <div className={styles.cart}>
                     <HiOutlineShoppingBag />
                     <span className={numberOfItems !== 0 ? `${styles.quantity}` : 'noDisplay'}>
                        {numberOfItems}
                     </span>
                  </div>
               </Link>

               <HiOutlineMenu onClick={toggleSideMenu} />
            </div>
         </div>
      </section>
   );
};
