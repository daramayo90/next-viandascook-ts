import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { AuthContext, UIContext } from '../../context';

import { FiLogIn } from 'react-icons/fi';
import { TbDiscount2 } from 'react-icons/tb';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi';
import {
   MdOutlineAdminPanelSettings,
   MdOutlineFoodBank,
   MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

import styles from '../../styles/SideMenu.module.css';

export const SideMenu = () => {
   const router = useRouter();

   const { isLoggedIn, logout, user } = useContext(AuthContext);

   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

   return (
      <section className={isMenuOpen ? `${styles.sidemenu} ${styles.open}` : `${styles.sidemenu}`}>
         <div className={isMenuOpen ? `${styles.options} ${styles.open}` : `${styles.options}`}>
            <ul className={styles.list}>
               {isLoggedIn && user?.role === 'admin' && (
                  <Link href='/admin'>
                     <a className={styles.linkItem} onClick={toggleSideMenu}>
                        <MdOutlineAdminPanelSettings className={styles.icon} />
                        <span>Admin</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </a>
                  </Link>
               )}

               {isLoggedIn && user?.role === 'viandas' && (
                  <Link href='/cocina'>
                     <a className={styles.linkItem} onClick={toggleSideMenu}>
                        <MdOutlineAdminPanelSettings className={styles.icon} />
                        <span>Cocina</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </a>
                  </Link>
               )}

               <Link href='/'>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <AiOutlineHome className={styles.icon} />
                     <span>Inicio</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/menu'>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <MdOutlineFoodBank className={styles.icon} />
                     <span>Elegí tus Viandas</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               {isLoggedIn && (
                  <>
                     <Link href='/pedidos/historial'>
                        <a className={styles.linkItem} onClick={toggleSideMenu}>
                           <HiOutlineClipboardList className={styles.icon} />
                           <span>Mis Pedidos</span>
                           <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                        </a>
                     </Link>

                     <Link href='/mi-cuenta'>
                        <a className={styles.linkItem} onClick={toggleSideMenu}>
                           <AiOutlineUser className={styles.icon} />
                           <span>Mi Cuenta</span>
                           <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                        </a>
                     </Link>
                  </>
               )}
               <Link href='/loyalty'>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <TbDiscount2 className={styles.icon} />
                     <span>Sumá Puntos</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/nosotros'>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <BsInfoCircle className={styles.icon} />
                     <span>Nosotros</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/como-funciona'>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <AiOutlineQuestionCircle className={styles.icon} />
                     <span>¿Cómo Funciona?</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/preguntas'>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <AiOutlineQuestionCircle className={styles.icon} />
                     <span>¿Dudas?</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               {!isLoggedIn ? (
                  <Link href={`/auth/login?page=${router.asPath}`}>
                     <a className={styles.linkItem} onClick={toggleSideMenu}>
                        <FiLogIn className={styles.icon} />
                        <span>Iniciá Sesión</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </a>
                  </Link>
               ) : (
                  <li onClick={logout} className={styles.linkItem}>
                     <HiOutlineLogout className={styles.icon} />
                     <span>Cerrar Sesión</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </li>
               )}
            </ul>
         </div>
      </section>
   );
};
