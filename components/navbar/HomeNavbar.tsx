import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { CartContext, UIContext } from '../../context';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { HiOutlineShoppingBag } from 'react-icons/hi';

import styles from '../../styles/ShopNavbar.module.css';

interface Props {
   pageTitle: string;
}

export const HomeNavbar: FC<Props> = ({ pageTitle }) => {
   const router = useRouter();

   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
   const { numberOfItems } = useContext(CartContext);

   const navigation = () => {
      router.back();
   };

   return (
      <section className={styles.shopNavbar}>
         <div className={styles.container}>
            <div className={styles.navigation}>
               <div className={styles.backMobile} onClick={navigation}>
                  <IoIosArrowRoundBack />
               </div>

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
