import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { HiOutlineMenu } from 'react-icons/hi';

import { UIContext } from '../../context';

import styles from '../../styles/Navbar.module.css';

export const Navbar = () => {
   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

   return (
      <section className={`${styles.navbar} ${styles.navbarWeb}`}>
         {/* <div className={styles.logo}>
            <Link href='/'>
               <div className={styles.nextImage}>
                  {isMenuOpen ? (
                     <Image
                        src='/logo/viandascook-primary.png'
                        alt='viandascook-logo'
                        width={100}
                        height={25}
                        layout='responsive'
                        priority={true}
                     />
                  ) : (
                     <Image
                        src='/logo/viandascook-logo-primary.png'
                        alt='viandascook-logo'
                        width={100}
                        height={25}
                        layout='responsive'
                        priority={true}
                     />
                  )}
               </div>
            </Link>
         </div>

         <div className={styles.menu} onClick={toggleSideMenu}>
            <HiOutlineMenu className={styles.menuIcon} />
         </div> */}
      </section>
   );
};
