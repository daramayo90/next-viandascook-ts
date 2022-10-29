import { FC, useContext } from 'react';
import Link from 'next/link';

import { CartContext, UIContext } from '../../context';

import { HiOutlineMenu, HiOutlineShoppingBag } from 'react-icons/hi';

import styles from '../../styles/ShopNavbar.module.css';

interface Props {
   pageTitle: string;
}

export const AuthNavbar: FC<Props> = ({ pageTitle }) => {
   const { toggleSideMenu } = useContext(UIContext);
   const { numberOfItems } = useContext(CartContext);

   return (
      <section className={styles.shopNavbar}>
         <div className={styles.container}>
            <div className={styles.navigation}>
               <h1 className={styles.title}>{pageTitle}</h1>
            </div>

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
