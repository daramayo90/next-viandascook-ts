import Link from 'next/link';
import Image from 'next/image';

import styles from '../../styles/Navbar.module.css';

export const NavbarAuth = () => {
   return (
      <section className={`${styles.navbar} ${styles.navbarWeb} ${styles.navbarAuth}`}>
         <div className={styles.logo}>
            <Link href='/'>
               <div className={styles.nextImage}>
                  <Image
                     src='/logo/viandascook-logo.png'
                     alt='viandascook-logo'
                     width={100}
                     height={28}
                     layout='responsive'
                  />
               </div>
            </Link>
         </div>
      </section>
   );
};
