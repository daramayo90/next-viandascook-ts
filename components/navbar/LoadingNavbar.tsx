import { FC } from 'react';
import Link from 'next/link';

import { HiOutlineShoppingBag } from 'react-icons/hi';

import styles from '../../styles/ShopNavbar.module.css';

interface Props {
   pageTitle: string;
}

export const LoadingNavbar: FC<Props> = ({ pageTitle }) => {
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
                     <span className={'noDisplay'}></span>
                  </div>
               </Link>

               {/* <HiOutlineMenu onClick={toggleSideMenu} /> */}
               <div className={styles.hamburgerMenu}>
                  <button aria-label='Menu' className={styles.btn}>
                     <span></span>
                     <span></span>
                     <span></span>
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
};
