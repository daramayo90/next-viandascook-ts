import { FC, useContext, useEffect, useState } from 'react';
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

   const { isCartSummaryOpen, isMenuOpen, toggleSideMenu } = useContext(UIContext);
   const { numberOfItems } = useContext(CartContext);

   const [showPromo, setShowPromo] = useState(false);

   const navigation = () => {
      if (backCart) return router.push('/menu');
      if (router.asPath === '/checkout') return router.push('/cart');
      if (router.asPath.includes('/checkout')) return router.push('/checkout');

      router.back();
   };

   useEffect(() => {
      const promoPaths = ['/menu', '/cart', '/plato'];
      const isShown = promoPaths.some((path) => router.asPath.includes(path));
      setShowPromo(isShown);
   }, [router.asPath]);

   if (isCartSummaryOpen) {
      return <></>;
   }

   return (
      <section className={styles.shopNavbar}>
         {showPromo && (
            <div className={styles.promo}>
               <p className={styles.text}>
                  Aprovechá un <strong>10% off en tu primera compra</strong> con el cupón de descuento
                  <strong> bienvenido10</strong>
               </p>
            </div>
         )}
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
                  <button
                     aria-label='Menu'
                     className={isMenuOpen ? `${styles.btn} ${styles.open}` : `${styles.btn}`}>
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
