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

interface TimeLeft {
   hours: number;
   minutes: number;
   seconds: number;
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

   const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const endTime = new Date('2024-05-15T23:59:59');
      const difference = endTime.getTime() - now.getTime();

      let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
         timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
         };
      }

      return timeLeft;
   };

   const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

   useEffect(() => {
      const timer = setInterval(() => {
         setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   const formatTimeLeft = (time: number): string => {
      return String(time).padStart(2, '0');
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
               {/* <p className={styles.text}>
                  Aprovechá un <strong>10% off en tu primera compra</strong> con el cupón de descuento
                  <strong> bienvenido10</strong>
               </p> */}
               <p className={styles.text}>
                  <strong>🔥VIANDAS HOT🔥</strong> ¡Quedan{' '}
                  <strong>
                     {`${formatTimeLeft(timeLeft.hours)}:${formatTimeLeft(
                        timeLeft.minutes,
                     )}:${formatTimeLeft(timeLeft.seconds)}`}
                  </strong>{' '}
                  para <strong>APROVECHAR!</strong>
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
