import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { CartContext, UIContext } from '../../context';

import { BiChevronLeft } from 'react-icons/bi';
import { HiOutlineMenu, HiOutlineShoppingBag } from 'react-icons/hi';

import styles from '../../styles/ShopNavbar.module.css';

interface Props {
   pageTitle: string;
}

export const ShopNavbar: FC<Props> = ({ pageTitle }) => {
   const router = useRouter();

   const { toggleSideMenu } = useContext(UIContext);
   const { numberOfItems } = useContext(CartContext);

   return (
      <section className={styles.shopNavbar}>
         <div className={styles.container}>
            <div className={styles.backMobile} onClick={() => router.push('/menu')}>
               <BiChevronLeft />
            </div>

            <h1 className={styles.title}>{pageTitle}</h1>

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
