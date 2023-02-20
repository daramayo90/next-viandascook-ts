import Link from 'next/link';

import { AuthContext } from '../../context';

import { useContext, useState } from 'react';
import { AiOutlineUser, AiOutlineUserAdd, AiOutlineEye } from 'react-icons/ai';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

import styles from '../../styles/Account.module.css';
import { TbDiscount2 } from 'react-icons/tb';
import { RiLockPasswordLine } from 'react-icons/ri';

export const Options = () => {
   const { logout } = useContext(AuthContext);

   const [darkmode, setDarkmode] = useState(false);

   const toggleDarkMode = () => {
      setDarkmode(!darkmode);
   };

   return (
      <div className={styles.options}>
         <Link href='/mi-cuenta/perfil'>
            <div className={styles.option}>
               <AiOutlineUser className={styles.icon} />
               <span>Perfil</span>
               <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
            </div>
         </Link>

         <Link href='/pedidos/historial'>
            <div className={styles.option}>
               <HiOutlineClipboardList className={styles.icon} />
               <span>Mis Pedidos</span>
               <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
            </div>
         </Link>

         <Link href='/mi-cuenta/puntos'>
            <div className={styles.option}>
               <TbDiscount2 className={styles.icon} />
               <span>Puntos Acumulados</span>
               <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
            </div>
         </Link>

         <Link href='/mi-cuenta/invitar-amigos'>
            <div className={styles.option}>
               <AiOutlineUserAdd className={styles.icon} />
               <span>Invitar Amigos</span>
               <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
            </div>
         </Link>

         <Link href='/mi-cuenta/password'>
            <div className={styles.option}>
               <RiLockPasswordLine className={styles.icon} />
               <span>Cambiar Clave</span>
               <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
            </div>
         </Link>

         <div className={styles.option} onClick={toggleDarkMode}>
            <AiOutlineEye className={styles.icon} />
            <span>Modo Oscuro</span>
            {!darkmode ? (
               <BsToggleOff className={styles.toggleIcon} />
            ) : (
               <BsToggleOn className={styles.toggleIcon} />
            )}
         </div>

         <div className={`${styles.option} ${styles.logout}`}>
            <HiOutlineLogout className={`${styles.icon} ${styles.logoutIcon}`} />
            <span onClick={logout}>Cerrar Sesión</span>
         </div>
      </div>
   );
};
