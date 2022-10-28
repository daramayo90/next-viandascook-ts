import { useRouter } from 'next/router';

import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardList, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdOutlineFoodBank } from 'react-icons/md';

import styles from '../../styles/TabMenu.module.css';

const menuItems = [
   {
      nav: '/menu',
      reacticon: <MdOutlineFoodBank />,
      name: 'Menu',
   },
   {
      nav: '/pedidos/historial',
      reacticon: <HiOutlineClipboardList />,
      name: 'Mis Pedidos',
   },
   {
      nav: '/cart',
      reacticon: <HiOutlineShoppingBag />,
      name: 'Carrito',
   },
   {
      nav: '/mi-cuenta',
      reacticon: <AiOutlineUser />,
      name: 'Mi Cuenta',
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
