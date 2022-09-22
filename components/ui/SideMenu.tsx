import { useContext, useEffect } from 'react';
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
         </div>
      </section>
   );
};
