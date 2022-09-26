import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { HiOutlineMenu } from 'react-icons/hi';

import { UIContext } from '../../context';

import styles from '../../styles/Navbar.module.css';

export const NavbarHome = () => {
   const { toggleSideMenu } = useContext(UIContext);

   return (
      <section className={styles.navbar}>
         <div className={styles.logo}>
            <Link href='/'>
               <div className={styles.nextImage}>
                  <Image
                     src='/logo/viandascook-logo.png'
                     alt='viandascook-logo'
                     width={100}
                     height={25}
                     layout='responsive'
                  />
               </div>
            </Link>
         </div>

         <div className={styles.menu} onClick={toggleSideMenu}>
            <HiOutlineMenu className={styles.menuIcon} />
         </div>
      </section>
   );
};
