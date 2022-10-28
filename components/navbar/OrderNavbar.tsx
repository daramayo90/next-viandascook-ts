import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { CartContext, UIContext } from '../../context';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { HiOutlineMenu, HiOutlineShoppingBag } from 'react-icons/hi';

import styles from '../../styles/ShopNavbar.module.css';

interface Props {
   pageTitle: string;
}

export const OrderNavbar: FC<Props> = ({ pageTitle }) => {
   const router = useRouter();

   const { toggleSideMenu } = useContext(UIContext);
   const { numberOfItems } = useContext(CartContext);

   const navigation = () => {
      if (router.asPath === '/pedidos/historial') return router.push('/menu');

      router.push('/pedidos/historial');
   };

   return (
      <section className={styles.orderNavbar}>
         <div className={styles.container}>
            <div className={styles.navigation}>
               <div className={styles.backMobile} onClick={navigation}>
                  <IoIosArrowRoundBack />
               </div>

               <h1 className={styles.title}>
                  {pageTitle.length > 20 ? pageTitle.substring(0, 21) + '...' : pageTitle}
               </h1>
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
