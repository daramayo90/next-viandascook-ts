import { useContext, useState } from 'react';
import { AiOutlineUser, AiOutlineUserAdd, AiOutlineEye } from 'react-icons/ai';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AuthContext } from '../../context';
import styles from '../../styles/Profile.module.css';

export const Options = () => {
   const { logout } = useContext(AuthContext);

   const [darkmode, setDarkmode] = useState(false);

   const toggleDarkMode = () => {
      setDarkmode(!darkmode);
   };
   return (
      <div className={styles.options}>
         <div className={styles.option}>
            <AiOutlineUser className={styles.icon} />
            <span>Perfil</span>
            <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
         </div>

         <div className={styles.option}>
            <FiMapPin className={styles.icon} />
            <span>Dirección</span>
            <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
         </div>

         <div className={styles.option}>
            <AiOutlineUserAdd className={styles.icon} />
            <span>Invitar Amigos</span>
            <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
         </div>

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
