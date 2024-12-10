import { useContext } from 'react';
import Link from 'next/link';

import { AuthContext, UIContext } from '../../context';

import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineKeyboardArrowRight, MdOutlineSpaceDashboard } from 'react-icons/md';
import { TfiDropbox } from 'react-icons/tfi';
import { TbChefHat } from 'react-icons/tb';
import { BsBagCheck } from 'react-icons/bs';

import styles from '../../styles/SideMenu.module.css';

export const SideAdminMenu = () => {
   const { logout } = useContext(AuthContext);

   const { isAdminMenuOpen, toggleAdminMenu } = useContext(UIContext);

   return (
      <section
         className={isAdminMenuOpen ? `${styles.sidemenu} ${styles.open}` : `${styles.sidemenu}`}>
         <div className={isAdminMenuOpen ? `${styles.options} ${styles.open}` : `${styles.options}`}>
            <ul className={styles.list}>
               <Link href='/admin'>
                  <a className={styles.linkItem} onClick={toggleAdminMenu}>
                     <MdOutlineSpaceDashboard className={styles.icon} />
                     <span>Admin</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/admin/dashboard/fecha-entrega'>
                  <a className={styles.linkItem} onClick={toggleAdminMenu}>
                     <MdOutlineSpaceDashboard className={styles.icon} />
                     <span>Admin - Entrega</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/admin/orders'>
                  <a className={styles.linkItem} onClick={toggleAdminMenu}>
                     <HiOutlineClipboardList className={styles.icon} />
                     <span>Pedidos</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/admin/products'>
                  <a className={styles.linkItem} onClick={toggleAdminMenu}>
                     <TfiDropbox className={styles.icon} />
                     <span>Productos</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/admin/users'>
                  <a className={styles.linkItem} onClick={toggleAdminMenu}>
                     <AiOutlineUser className={styles.icon} />
                     <span>Usuarios</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/admin/preparar-platos'>
                  <a className={styles.linkItem} onClick={toggleAdminMenu}>
                     <TbChefHat className={styles.icon} />
                     <span>Preparar platos</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/admin/preparar-pedidos'>
                  <a className={styles.linkItem} onClick={toggleAdminMenu}>
                     <BsBagCheck className={styles.icon} />
                     <span>Preparar pedidos</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <li onClick={logout} className={styles.linkItem}>
                  <HiOutlineLogout className={styles.icon} />
                  <span>Cerrar Sesión</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>
            </ul>
         </div>
      </section>
   );
};
