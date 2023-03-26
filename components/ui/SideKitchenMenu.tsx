import { useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext, UIContext } from '../../context';

import { BsBagCheck } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { TbChefHat } from 'react-icons/tb';

import styles from '../../styles/SideMenu.module.css';

export const SideKitchenMenu = () => {
   const router = useRouter();

   const { logout } = useContext(AuthContext);

   const { isKitchenMenuOpen, toggleKitchenMenu } = useContext(UIContext);

   const navigateTo = (url: string) => {
      toggleKitchenMenu();
      router.push(url);
   };

   return (
      <section
         className={isKitchenMenuOpen ? `${styles.sidemenu} ${styles.open}` : `${styles.sidemenu}`}>
         <div
            className={
               isKitchenMenuOpen ? `${styles.options} ${styles.open}` : `${styles.options}`
            }>
            <ul className={styles.list}>
               <li onClick={() => navigateTo('/admin/preparar-platos')}>
                  <TbChefHat className={styles.icon} />
                  <span>Preparar platos</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>

               <li onClick={() => navigateTo('/admin/preparar-pedidos')}>
                  <BsBagCheck className={styles.icon} />
                  <span>Preparar pedidos</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>

               <li onClick={logout}>
                  <HiOutlineLogout className={styles.icon} />
                  <span>Cerrar Sesión</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>
            </ul>
         </div>
      </section>
   );
};
