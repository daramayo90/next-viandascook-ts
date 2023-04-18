import { useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext, UIContext } from '../../context';

import { BsBagCheck } from 'react-icons/bs';
import { HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineKeyboardArrowRight, MdOutlineSpaceDashboard } from 'react-icons/md';
import { TbChefHat } from 'react-icons/tb';

import styles from '../../styles/SideMenu.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import { TfiDropbox } from 'react-icons/tfi';

export const SideViandasMenu = () => {
   const router = useRouter();

   const { logout, user } = useContext(AuthContext);

   const { isViandasMenuOpen, toggleViandasMenu } = useContext(UIContext);

   const navigateTo = (url: string) => {
      toggleViandasMenu();
      router.push(url);
   };

   return (
      <section
         className={isViandasMenuOpen ? `${styles.sidemenu} ${styles.open}` : `${styles.sidemenu}`}>
         <div
            className={
               isViandasMenuOpen ? `${styles.options} ${styles.open}` : `${styles.options}`
            }>
            <ul className={styles.list}>
               {user?.role === 'admin' && (
                  <>
                     <li onClick={() => navigateTo('/admin')}>
                        <MdOutlineSpaceDashboard className={styles.icon} />
                        <span>Dashboard</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </li>

                     <li onClick={() => navigateTo('/admin/orders')}>
                        <HiOutlineClipboardList className={styles.icon} />
                        <span>Pedidos</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </li>

                     <li onClick={() => navigateTo('/admin/products')}>
                        <TfiDropbox className={styles.icon} />
                        <span>Productos</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </li>

                     <li onClick={() => navigateTo('/admin/users')}>
                        <AiOutlineUser className={styles.icon} />
                        <span>Usuarios</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </li>
                  </>
               )}

               <li onClick={() => navigateTo('/cocina/preparar-platos')}>
                  <TbChefHat className={styles.icon} />
                  <span>Preparar platos</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>

               <li onClick={() => navigateTo('/cocina/preparar-pedidos')}>
                  <BsBagCheck className={styles.icon} />
                  <span>Preparar pedidos</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>

               <li onClick={() => navigateTo('/onlera/orders')}>
                  <HiOutlineClipboardList className={styles.icon} />
                  <span>Ver Pedidos</span>
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
