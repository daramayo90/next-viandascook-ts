import { FC, useContext } from 'react';
import Link from 'next/link';

import { CartContext, UIContext } from '../../context';

import { HiOutlineMenu, HiOutlineShoppingBag } from 'react-icons/hi';

import styles from '../../styles/ShopNavbar.module.css';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/router';

interface Props {
   pageTitle: string;
}

export const AuthNavbar: FC<Props> = ({ pageTitle }) => {
   const router = useRouter();

   const { toggleSideMenu } = useContext(UIContext);
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

               <HiOutlineMenu onClick={toggleSideMenu} />
            </div>
         </div>
      </section>
   );
};
