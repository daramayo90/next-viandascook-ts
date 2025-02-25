import { useContext } from 'react';
import Link from 'next/link';

import { AuthContext, UIContext } from '../../context';

import { BsBagCheck } from 'react-icons/bs';
import { HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineKeyboardArrowRight, MdOutlineSpaceDashboard } from 'react-icons/md';
import { TbChefHat } from 'react-icons/tb';

import styles from './styles/SideMenuAdmin.module.scss';
import { AiOutlineUser } from 'react-icons/ai';
import { TfiDropbox } from 'react-icons/tfi';

export const SideViandasMenu = () => {
   const { logout, user } = useContext(AuthContext);

   const { isViandasMenuOpen, toggleViandasMenu, toggleAdminMenu } = useContext(UIContext);

   return (
      <section
         className={isViandasMenuOpen ? `${styles.sidemenu} ${styles.open}` : `${styles.sidemenu}`}>
         <div className={isViandasMenuOpen ? `${styles.options} ${styles.open}` : `${styles.options}`}>
            <ul className={styles.list}>
               {user?.role === 'admin' && (
                  <>
                     <Link href='/admin'>
                        <a className={styles.linkItem} onClick={toggleAdminMenu}>
                           <MdOutlineSpaceDashboard className={styles.icon} />
                           <span>Dashboard</span>
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
                  </>
               )}

               <Link href='/cocina/preparar-platos'>
                  <a className={styles.linkItem} onClick={toggleViandasMenu}>
                     <TbChefHat className={styles.icon} />
                     <span>Preparar platos</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/cocina/preparar-pedidos'>
                  <a className={styles.linkItem} onClick={toggleViandasMenu}>
                     <BsBagCheck className={styles.icon} />
                     <span>Preparar pedidos</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/onlera/orders'>
                  <a className={styles.linkItem} onClick={toggleViandasMenu}>
                     <HiOutlineClipboardList className={styles.icon} />
                     <span>Ver Pedidos</span>
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
