import { useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext, UIContext } from '../../context';

import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineKeyboardArrowRight, MdOutlineSpaceDashboard } from 'react-icons/md';

import styles from '../../styles/SideMenu.module.css';

export const SideAdminMenu = () => {
   const router = useRouter();

   const { logout } = useContext(AuthContext);

   const { isAdminMenuOpen, toggleAdminMenu } = useContext(UIContext);

   const navigateTo = (url: string) => {
      toggleAdminMenu();
      router.push(url);
   };

   return (
      <section
         className={isAdminMenuOpen ? `${styles.sidemenu} ${styles.open}` : `${styles.sidemenu}`}>
         <div
            className={isAdminMenuOpen ? `${styles.options} ${styles.open}` : `${styles.options}`}>
            <ul className={styles.list}>
               <li onClick={() => navigateTo('/admin')}>
                  <MdOutlineSpaceDashboard className={styles.icon} />
                  <span>Dashboard</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>
               <li onClick={() => navigateTo('/admin/users')}>
                  <AiOutlineUser className={styles.icon} />
                  <span>Usuarios</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>
               <li onClick={() => navigateTo('/admin/orders')}>
                  <HiOutlineClipboardList className={styles.icon} />
                  <span>Pedidos</span>
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
