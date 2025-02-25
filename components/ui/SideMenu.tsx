import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { AuthContext, UIContext } from '../../context';

import { FiPackage, FiLogIn, FiMessageCircle } from 'react-icons/fi';
import { TbDiscount2 } from 'react-icons/tb';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { HiOutlineLogout } from 'react-icons/hi';
import {
   MdOutlineAdminPanelSettings,
   MdOutlineDiscount,
   MdOutlineFoodBank,
   MdOutlineKeyboardArrowRight,
   MdOutlineQuestionAnswer,
} from 'react-icons/md';

import styles from './styles/SideMenu.module.scss';

export const SideMenu = () => {
   const router = useRouter();

   const { isLoggedIn, logout, user } = useContext(AuthContext);

   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

   return (
      <section className={isMenuOpen ? `${styles.sidemenu} ${styles.open}` : `${styles.sidemenu}`}>
         <div className={isMenuOpen ? `${styles.options} ${styles.open}` : `${styles.options}`}>
            <div className={styles.list}>
               {isLoggedIn && user?.role === 'viandas' && (
                  <Link href='/cocina' prefetch={false}>
                     <a className={styles.linkItem} onClick={toggleSideMenu}>
                        <MdOutlineAdminPanelSettings className={styles.icon} />
                        <span>Cocina</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </a>
                  </Link>
               )}

               <Link href='/menu' prefetch={false}>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <MdOutlineFoodBank className={styles.icon} />
                     <span>Menú</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/packs' prefetch={false}>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <FiPackage className={styles.icon} />
                     <span>Packs</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/descuentos' prefetch={false}>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <MdOutlineDiscount className={styles.icon} />
                     <span>Descuentos</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/loyalty' prefetch={false}>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <TbDiscount2 className={styles.icon} />
                     <span>Club Viandlover</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/preguntas' prefetch={false}>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <AiOutlineQuestionCircle className={styles.icon} />
                     <span>¿Dudas?</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/nosotros' prefetch={false}>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <BsInfoCircle className={styles.icon} />
                     <span>Sobre Nosotros</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/como-funciona' prefetch={false}>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <MdOutlineQuestionAnswer className={styles.icon} />
                     <span>¿Cómo Funciona?</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               <Link href='/blog' prefetch={false}>
                  <a className={styles.linkItem} onClick={toggleSideMenu}>
                     <FiMessageCircle className={styles.icon} />
                     <span>Blog</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </a>
               </Link>

               {!isLoggedIn ? (
                  <Link href={`/auth/login?page=${router.asPath}`} prefetch={false}>
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
            </div>
         </div>
      </section>
   );
};
