import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { CartContext, UIContext } from '../../context';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { HiOutlineShoppingBag } from 'react-icons/hi';

import styles from '../../styles/ShopNavbar.module.css';

interface Props {
   pageTitle: string;
   menuPage: boolean;
   backCart: boolean;
}

export const ShopNavbar: FC<Props> = ({ pageTitle, menuPage, backCart }) => {
   const router = useRouter();

   console.log(pageTitle);

   const { isCartSummaryOpen, isMenuOpen, toggleSideMenu } = useContext(UIContext);
   const { numberOfItems } = useContext(CartContext);

   const navigation = () => {
      if (backCart) return router.push('/menu');
      if (router.asPath === '/checkout') return router.push('/cart');
      if (router.asPath.includes('/checkout')) return router.push('/checkout');

      router.back();
   };

   if (isCartSummaryOpen) {
      return <></>;
   }

   return (
      <section className={styles.shopNavbar}>
         <div className={styles.container}>
            <div className={styles.navigation}>
               {!menuPage && (
                  <div className={styles.backMobile} onClick={navigation}>
                     <IoIosArrowRoundBack />
                  </div>
               )}

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

               {/* <HiOutlineMenu onClick={toggleSideMenu} /> */}
               <div className={styles.hamburgerMenu} onClick={toggleSideMenu}>
                  <button className={isMenuOpen ? `${styles.btn} ${styles.open}` : `${styles.btn}`}>
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
