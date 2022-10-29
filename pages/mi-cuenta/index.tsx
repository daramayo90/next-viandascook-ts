import { useState } from 'react';

import { NextPage } from 'next';
import Image from 'next/image';

import { ShopLayout } from '../../components/layouts';
import { TabMenu } from '../../components/ui';

import { AiFillEdit, AiOutlineEye, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';

import styles from '../../styles/Profile.module.css';

const ProfilePage: NextPage = () => {
   const [darkmode, setDarkmode] = useState(false);

   const toggleDarkMode = () => {
      setDarkmode(!darkmode);
   };

   return (
      <ShopLayout title={'Mi Cuenta'} pageDescription={''}>
         <section className={styles.profile}>
            <div className={styles.container}>
               <div className={styles.account}>
                  <div className={styles.nextImage}>
                     <Image src={`/profile/avatar.jpg`} alt='avatar' width={90} height={90} />
                  </div>

                  <div className={styles.info}>
                     <span className={styles.name}>Damián Aramayo</span>
                     <span className={styles.phone}>+54 9 1136527688</span>
                  </div>

                  <AiFillEdit className={styles.editIcon} />
               </div>

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
                     <HiOutlineLogout className={styles.icon} />
                     <span>Cerrar Sesión</span>
                  </div>
               </div>
            </div>
         </section>
         <TabMenu />
      </ShopLayout>
   );
};

export default ProfilePage;
