import { useContext } from 'react';
import { useRouter } from 'next/router';

import { IoMdClose } from 'react-icons/io';

import { UIContext } from '../../context/ui';

import styles from '../../styles/SideMenu.module.css';

export const SideMenu = () => {
   const router = useRouter();
   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

   const navigateTo = (url: string) => {
      toggleSideMenu();
      router.push(url);
   };

   if (!isMenuOpen) {
      return <></>;
   }

   return (
      <section className={styles.sidemenu}>
         <div className={styles.close} onClick={toggleSideMenu}>
            <IoMdClose className={styles.closeIcon} />
         </div>

         <div className={styles.menuBack}>
            <img src='/img/menu-mobile.jpg' alt='Viandas Cook Banner Fondo' />
         </div>

         <div className={styles.logo}>
            <img src='/logo/viandascook-logo-primary.png' alt='Viandas Cook Logo' />
         </div>

         <div className={styles.menuOptions}>
            <ul className={styles.list}>
               <li onClick={() => navigateTo('/')}>Mi cuenta</li>
               <li onClick={() => navigateTo('/')}>Nosotros</li>
               <li onClick={() => navigateTo('/')}>Sumá Puntos</li>
               <li onClick={() => navigateTo('/')}>Elegí tus Viandas</li>
               <li onClick={() => navigateTo('/')}>¿Preguntas?</li>
            </ul>

            <div className={styles.login}>
               <button onClick={() => navigateTo('/')}>Iniciá Sesión</button>
            </div>
         </div>
      </section>
   );
};
