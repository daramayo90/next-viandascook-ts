import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { UIContext } from '../../context';

import styles from '../../styles/AdminNavbar.module.css';

export const AdminNavbar = () => {
   const { isAdminMenuOpen, toggleAdminMenu } = useContext(UIContext);

   return (
      <section className={styles.navbar}>
         <div className={styles.logo}>
            <Link href='/'>
               <div className={styles.nextImage}>
                  <Image
                     src='/logo/viandascook-logo.png'
                     alt='viandascook-logo'
                     width={100}
                     height={30}
                     layout='responsive'
                     priority={true}
                  />
               </div>
            </Link>
         </div>

         <div className={styles.hamburgerMenu} onClick={toggleAdminMenu}>
            <button className={isAdminMenuOpen ? `${styles.btn} ${styles.open}` : `${styles.btn}`}>
               <span></span>
               <span></span>
               <span></span>
            </button>
         </div>
      </section>
   );
};
