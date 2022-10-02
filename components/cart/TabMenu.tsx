import { useRouter } from 'next/router';

import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { MdOutlineFoodBank } from 'react-icons/md';

import styles from '../../styles/TabMenu.module.css';

const menuItems = [
   {
      nav: '/menu',
      icon: <MdOutlineFoodBank />,
      name: 'Menu',
   },
   {
      nav: '/pedidos',
      icon: <HiOutlineClipboardList />,
      name: 'Pedidos',
   },
   {
      nav: '/favoritos',
      icon: <AiOutlineHeart />,
      name: 'Favoritos',
   },
   {
      nav: '/perfil',
      icon: <AiOutlineUser />,
      name: 'Perfil',
   },
];

export const TabMenu = () => {
   const router = useRouter();
   const path = router.asPath;

   const navigateTo = (url: string) => {
      router.push(url);
   };

   return (
      <footer className={styles.tabMenu}>
         <div className={styles.container}>
            {menuItems.map(({ nav, icon, name }) => (
               <div key={name} className={styles.option} onClick={() => navigateTo(nav)}>
                  <div className={path === nav ? `${styles.icon} tabSelected` : `${styles.icon}`}>
                     {icon}
                  </div>

                  <div className={path === nav ? `${styles.name} tabSelected` : `${styles.name}`}>
                     {name}
                  </div>
               </div>
            ))}
         </div>
      </footer>
   );
};
