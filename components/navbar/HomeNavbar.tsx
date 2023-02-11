import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { UIContext } from '../../context';

import styles from '../../styles/Navbar.module.css';

export const HomeNavbar = () => {
   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

   return (
      <section className={styles.navbar}>
         <div className={styles.logo}>
            <Link href='/'>
               <div className={styles.nextImage}>
                  {!isMenuOpen ? (
                     <Image
                        src='/logo/viandascook-logo.png'
                        alt='viandascook-logo'
                        width={100}
                        height={25}
                        layout='responsive'
                        priority={true}
                     />
                  ) : (
                     <>
                        <div className={styles.openInMobile}>
                           <Image
                              src='/logo/viandascook-logo-primary.png'
                              alt='viandascook-logo'
                              width={100}
                              height={36}
                              layout='responsive'
                              priority={true}
                           />
                        </div>
                        <div className={styles.openInDesktop}>
                           <Image
                              src='/logo/viandascook-logo.png'
                              alt='viandascook-logo'
                              width={100}
                              height={25}
                              layout='responsive'
                              priority={true}
                           />
                        </div>
                     </>
                  )}
               </div>
            </Link>
         </div>

         <div className={styles.hamburgerMenu} onClick={toggleSideMenu}>
            <button className={isMenuOpen ? `${styles.btn} ${styles.open}` : `${styles.btn}`}>
               <span></span>
               <span></span>
               <span></span>
            </button>
         </div>
      </section>
   );
};
