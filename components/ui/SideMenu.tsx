import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { AuthContext, UIContext } from '../../context';

import { IoMdClose } from 'react-icons/io';

import styles from '../../styles/SideMenu.module.css';

export const SideMenu = () => {
   const router = useRouter();

   const { isLoggedIn, user, logout } = useContext(AuthContext);

   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

   useEffect(() => {
      const main = document.getElementById('main')!;

      if (isMenuOpen) {
         document.body.style.overflow = 'hidden';
         main.style.filter = 'blur(4px)';
      } else {
         document.body.style.overflow = 'scroll';
         main.style.filter = 'none';
      }
   }, [isMenuOpen]);

   const navigateTo = (url: string) => {
      toggleSideMenu();
      router.push(url);
   };

   if (!isMenuOpen) {
      return <></>;
   }

   return (
      <section className={styles.sidemenu}>
         <div className={styles.container}>
            <div className={styles.close} onClick={toggleSideMenu}>
               <IoMdClose className={styles.closeIcon} />
            </div>

            <div className={styles.logo}>
               <div className={styles.nextImage}>
                  <Image
                     src='/logo/viandascook-logo-primary.png'
                     alt='Viandas Cook Logo'
                     width={100}
                     height={35}
                     layout='responsive'
                  />
               </div>
            </div>

            <div className={styles.menuOptions}>
               <ul className={styles.list}>
                  {isLoggedIn && <li onClick={() => navigateTo('/mi-cuenta')}>Mi Cuenta</li>}
                  {isLoggedIn && <li onClick={() => navigateTo('/mis-pedidos')}>Mis Pedidos</li>}
                  <li onClick={() => navigateTo('/menu')}>Elegí tus Viandas</li>
                  <li onClick={() => navigateTo('/nosotros')}>Nosotros</li>
                  <li onClick={() => navigateTo('/loyalty')}>Sumá Puntos</li>
                  <li onClick={() => navigateTo('/preguntas')}>¿Preguntas?</li>
               </ul>

               {!isLoggedIn ? (
                  <div className={styles.login}>
                     <button onClick={() => navigateTo(`/auth/login?page=${router.asPath}`)}>
                        Iniciá Sesión
                     </button>
                  </div>
               ) : (
                  <div className={styles.login}>
                     <button onClick={logout}>Cerrar Sesión</button>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
};
