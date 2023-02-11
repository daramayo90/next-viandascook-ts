import { useContext } from 'react';
import { useRouter } from 'next/router';

import { CartContext } from '../../context';

import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardList, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdOutlineFoodBank } from 'react-icons/md';

import styles from '../../styles/TabMenu.module.css';

const menuItems = [
   {
      nav: '/menu',
      icon: <MdOutlineFoodBank />,
      name: 'Menu',
   },
   {
      nav: '/pedidos/historial',
      icon: <HiOutlineClipboardList />,
      name: 'Mis Pedidos',
   },
   {
      nav: '/cart',
      icon: <HiOutlineShoppingBag />,
      name: 'Carrito',
   },
   {
      nav: '/mi-cuenta',
      icon: <AiOutlineUser />,
      name: 'Mi Cuenta',
   },
];

export const TabMenu = () => {
   const { numberOfItems } = useContext(CartContext);

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
                  <div
                     className={
                        path.includes(nav) ? `${styles.icon} tabSelected` : `${styles.icon}`
                     }>
                     {icon}
                     {name === 'Carrito' && (
                        <span className={numberOfItems !== 0 ? `${styles.quantity}` : 'noDisplay'}>
                           {numberOfItems}
                        </span>
                     )}
                  </div>

                  <div
                     className={
                        path.includes(nav) ? `${styles.name} tabSelected` : `${styles.name}`
                     }>
                     {name}
                  </div>
               </div>
            ))}
         </div>
      </footer>
   );
};
