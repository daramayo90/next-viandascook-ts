import { useContext, useEffect, useState } from 'react';
import router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { AuthContext, UIContext } from '../../context';

import styles from '../../styles/Navbar.module.css';

export const MainNavbar = () => {
   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
   const { isLoggedIn, user } = useContext(AuthContext);

   const [isScroll, setIsScroll] = useState(false);

   useEffect(() => {
      if (isMenuOpen) {
         setIsScroll(false);
      } else {
         stickNavbar();
         window.addEventListener('scroll', stickNavbar);
      }

      return () => {
         window.removeEventListener('scroll', stickNavbar);
      };
   }, [isMenuOpen]);

   const stickNavbar = () => {
      if (window !== undefined) {
         let windowHeight = window.scrollY;
         windowHeight > 50 ? setIsScroll(true) : setIsScroll(false);
      }
   };

   return (
      <section className={isScroll ? `fadeIn ${styles.scroll} ${styles.navbar}` : `${styles.navbar}`}>
         <div className={styles.container}>
            <div className={styles.logo}>
               <Link href='/'>
                  <div className={styles.nextImage}>
                     {!isMenuOpen && (
                        <Image
                           src='/logo/viandascook-logo.png'
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

            <div className={styles.menu}>
               <div className={styles.container}>
                  <Link href='/menu' prefetch={false}>
                     <a className={styles.linkItem}>
                        <span>Menú</span>
                     </a>
                  </Link>

                  <Link href='/nosotros' prefetch={false}>
                     <a className={styles.linkItem}>
                        <span>Sobre Nosotros</span>
                     </a>
                  </Link>

                  <Link href='/blog' prefetch={false}>
                     <a className={styles.linkItem}>
                        <span>Blog</span>
                     </a>
                  </Link>

                  <div className={styles.dropdown}>
                     <div className={styles.linkItem}>
                        <span>Más ▾</span>
                     </div>

                     <div className={styles.dropdownContent}>
                        <Link href='/descuentos' prefetch={false}>
                           <a className={styles.linkItem}>
                              <span className={styles.desktopItem}>Descuentos</span>
                           </a>
                        </Link>

                        <Link href='/loyalty' prefetch={false}>
                           <a className={styles.linkItem}>
                              <span className={styles.desktopItem}>Sumá Puntos</span>
                           </a>
                        </Link>

                        <Link href='/como-funciona' prefetch={false}>
                           <a className={styles.linkItem}>
                              <span className={styles.desktopItem}>¿Cómo Funciona?</span>
                           </a>
                        </Link>

                        <Link href='/preguntas' prefetch={false}>
                           <a className={styles.linkItem}>
                              <span className={styles.desktopItem}>¿Dudas?</span>
                           </a>
                        </Link>
                     </div>
                  </div>
               </div>

               <div className={styles.account}>
                  {isLoggedIn ? (
                     <>
                        <Image
                           src={`${user!.avatar}`}
                           alt='avatar'
                           width={40}
                           height={40}
                           layout='fixed'
                           objectFit='cover'
                        />
                        <Link href='/mi-cuenta' prefetch={false}>
                           <a className={`${styles.linkItem}`}>
                              <span>{user!.name}</span>
                           </a>
                        </Link>
                     </>
                  ) : (
                     <>
                        <Link href={`/auth/login?page=${router.asPath}`} prefetch={false}>
                           <a className={styles.linkItem}>
                              <button className={styles.auth}>Iniciá Sesión</button>
                           </a>
                        </Link>

                        <Link href={`/auth/register?page=${router.asPath}`} prefetch={false}>
                           <a className={styles.linkItem}>
                              <span>Registrate</span>
                           </a>
                        </Link>
                     </>
                  )}
               </div>
            </div>

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
      </section>
   );
};
