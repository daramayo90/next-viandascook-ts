import { useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext, UIContext } from '../../context';

import { FiLogIn } from 'react-icons/fi';
import { TbDiscount2 } from 'react-icons/tb';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineFoodBank, MdOutlineKeyboardArrowRight } from 'react-icons/md';

import styles from '../../styles/SideMenu.module.css';

export const SideMenu = () => {
   const router = useRouter();

   const { isLoggedIn, logout } = useContext(AuthContext);

   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

   const navigateTo = (url: string) => {
      toggleSideMenu();
      router.push(url);
   };

   return (
      <section className={isMenuOpen ? `${styles.sidemenu} ${styles.open}` : `${styles.sidemenu}`}>
         <div className={isMenuOpen ? `${styles.options} ${styles.open}` : `${styles.options}`}>
            <ul className={styles.list}>
               <li onClick={() => navigateTo('/')}>
                  <AiOutlineHome className={styles.icon} />
                  <span>Inicio</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>

               <li onClick={() => navigateTo('/menu')}>
                  <MdOutlineFoodBank className={styles.icon} />
                  <span>Elegí tus Viandas</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>
               {isLoggedIn && (
                  <>
                     <li onClick={() => navigateTo('/pedidos/historial')}>
                        <HiOutlineClipboardList className={styles.icon} />
                        <span>Mis Pedidos</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </li>
                     <li onClick={() => navigateTo('/mi-cuenta')}>
                        <AiOutlineUser className={styles.icon} />
                        <span>Mi Cuenta</span>
                        <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                     </li>
                  </>
               )}
               <li onClick={() => navigateTo('/loyalty')}>
                  <TbDiscount2 className={styles.icon} />
                  <span>Sumá Puntos</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>
               <li onClick={() => navigateTo('/nosotros')}>
                  <BsInfoCircle className={styles.icon} />
                  <span>Nosotros</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>
               <li onClick={() => navigateTo('/como-funciona')}>
                  <AiOutlineQuestionCircle className={styles.icon} />
                  <span>¿Cómo Funciona?</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>
               <li onClick={() => navigateTo('/preguntas')}>
                  <AiOutlineQuestionCircle className={styles.icon} />
                  <span>¿Dudas?</span>
                  <MdOutlineKeyboardArrowRight className={styles.iconRight} />
               </li>

               {!isLoggedIn ? (
                  <li onClick={() => navigateTo(`/auth/login?page=${router.asPath}`)}>
                     <FiLogIn className={styles.icon} />
                     <span>Iniciá Sesión</span>
                     <MdOutlineKeyboardArrowRight className={styles.iconRight} />
                  </li>
               ) : (
                  <li onClick={logout}>
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
