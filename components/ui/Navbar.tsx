import { useContext } from 'react';
import Link from 'next/link';

import { HiOutlineMenu } from 'react-icons/hi';

import { UIContext } from '../../context/ui';

import styles from '../../styles/Navbar.module.css';

export const Navbar = () => {
   const { toggleSideMenu } = useContext(UIContext);

   return (
      <section className={styles.navbar}>
         <div className={styles.logo}>
            <Link href='/'>
               <img src='/logo/viandascook-logo.png' alt='viandascook-logo' />
            </Link>
         </div>

         <div className={styles.menu} onClick={toggleSideMenu}>
            <HiOutlineMenu className={styles.menuIcon} />
         </div>
      </section>
   );
};
