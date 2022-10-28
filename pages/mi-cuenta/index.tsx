import { NextPage } from 'next';
import Image from 'next/image';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { ShopLayout } from '../../components/layouts';
import { TabMenu } from '../../components/ui';

import styles from '../../styles/Profile.module.css';

const ProfilePage: NextPage = () => {
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
                     <span>Perfil</span>
                     <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
                  </div>
                  <div className={styles.option}>
                     <span>Dirección</span>
                     <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
                  </div>
                  <div className={styles.option}>
                     <span>Modo Oscuro</span>
                     <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
                  </div>
                  <div className={styles.option}>
                     <span>Invitar Amigos</span>
                     <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
                  </div>
                  <div className={styles.option}>
                     <span>Cerrar Sesión</span>
                     <MdOutlineKeyboardArrowRight className={styles.rightIcon} />
                  </div>
               </div>
            </div>
         </section>
         <TabMenu />
      </ShopLayout>
   );
};

export default ProfilePage;
