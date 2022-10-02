import { useRouter } from 'next/router';

import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { MdOutlineFoodBank } from 'react-icons/md';

import styles from '../../styles/TabMenu.module.css';

const menuItems = [
   {
      nav: '/menu',
      reacticon: <MdOutlineFoodBank />,
      name: 'Menu',
   },
   {
      nav: '/pedidos',
      reacticon: <HiOutlineClipboardList />,
      name: 'Pedidos',
   },
   {
      nav: '/favoritos',
      reacticon: <AiOutlineHeart />,
      name: 'Favoritos',
   },
   {
      nav: '/perfil',
      reacticon: <AiOutlineUser />,
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
            {menuItems.map(({ nav, reacticon, name }) => (
               <div key={name} className={styles.option} onClick={() => navigateTo(nav)}>
                  <div className={path === nav ? `${styles.icon} tabSelected` : `${styles.icon}`}>
                     {reacticon}
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
