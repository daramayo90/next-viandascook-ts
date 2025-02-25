import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { IoBag } from 'react-icons/io5';

import { AuthContext, CartContext, UIContext } from '../../context';
import { cloudIcons } from '../../utils';

import styles from './styles/Navbar.module.scss';

export const Navbar: FC = () => {
   const router = useRouter();

   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
   const { isLoggedIn } = useContext(AuthContext);
   const { totalQuantityOfItems } = useContext(CartContext);

   const handleGoToHomePage = () => {
      if (isMenuOpen) toggleSideMenu();
      router.push('/');
   };

   const handleOpenUserAccount = () => {
      if (isMenuOpen) toggleSideMenu();
      router.push('/mi-cuenta');
   };

   return (
      <section className={styles.navbar}>
         <div className={styles.container}>
            <div className={styles.logo} onClick={handleGoToHomePage}>
               <div className={styles.image}>
                  <Image
                     src='/logo/viandascook-logo-primary.png'
                     alt='viandascook-logo'
                     width={100}
                     height={35}
                     layout='responsive'
                     priority={true}
                  />
               </div>
            </div>

            <div className={styles.mobile}>
               {isLoggedIn && <Cart totalQuantityOfItems={totalQuantityOfItems} />}

               <UserAvatar
                  onClick={handleOpenUserAccount}
                  width={20}
                  height={20}
                  className={styles.mobileUser}
               />

               <div className={styles.mobileMenu} onClick={toggleSideMenu}>
                  <Image
                     src={`${cloudIcons}/dedyp285x2so76nngbld`}
                     alt='menu'
                     width={25}
                     height={20}
                  />
               </div>
            </div>

            <div className={styles.desktop}>
               <DesktopMenu />

               <div className={styles.right}>
                  {isLoggedIn && <Cart totalQuantityOfItems={totalQuantityOfItems} />}

                  <DesktopAccount isLoggedIn={isLoggedIn} currentPath={router.asPath} />
               </div>
            </div>
         </div>
      </section>
   );
};

interface CartProps {
   totalQuantityOfItems: number;
}

const Cart: FC<CartProps> = ({ totalQuantityOfItems }) => (
   <Link href='/cart'>
      <div className={styles.cart}>
         <IoBag className={styles.icon} />
         <span className={totalQuantityOfItems !== 0 ? styles.quantity : 'noDisplay'}>
            {totalQuantityOfItems}
         </span>
      </div>
   </Link>
);

interface UserAvatarProps {
   onClick?: () => void;
   width: number;
   height: number;
   className?: string;
   isLink?: boolean;
}

const UserAvatar: FC<UserAvatarProps> = ({ onClick, width, height, className, isLink = false }) => {
   const avatar = (
      <Image
         src={`${cloudIcons}/f0v5soqakf6inytgayss`}
         alt='user'
         width={width}
         height={height}
         layout={isLink ? 'fixed' : undefined}
         objectFit={isLink ? 'cover' : undefined}
      />
   );
   return isLink ? (
      <Link href='/mi-cuenta' prefetch={false}>
         <a>{avatar}</a>
      </Link>
   ) : (
      <div onClick={onClick} className={className}>
         {avatar}
      </div>
   );
};

const DesktopMenu: FC = () => (
   <div className={styles.containerMenu}>
      <Link href='/menu' prefetch={false}>
         <a className={styles.linkItem}>
            <span className={styles.text}>Menú</span>
         </a>
      </Link>

      <Link href='/packs' prefetch={false}>
         <a className={styles.linkItem}>
            <span className={styles.text}>Packs</span>
         </a>
      </Link>

      <Link href='/descuentos' prefetch={false}>
         <a className={styles.linkItem}>
            <span className={styles.text}>Descuentos</span>
         </a>
      </Link>

      <Link href='/loyalty' prefetch={false}>
         <a className={styles.linkItem}>
            <span className={styles.text}>Club Viandlover</span>
         </a>
      </Link>

      <Link href='/preguntas' prefetch={false}>
         <a className={styles.linkItem}>
            <span className={styles.text}>¿Dudas?</span>
         </a>
      </Link>

      <Link href='/nosotros' prefetch={false}>
         <a className={styles.linkItem}>
            <span className={styles.text}>Sobre Nosotros</span>
         </a>
      </Link>

      <Link href='/como-funciona' prefetch={false}>
         <a className={styles.linkItem}>
            <span className={styles.text}>Cómo Funciona</span>
         </a>
      </Link>

      <Link href='/blog' prefetch={false}>
         <a className={styles.linkItem}>
            <span className={styles.text}>Blog</span>
         </a>
      </Link>
   </div>
);

interface DesktopAccountProps {
   isLoggedIn: boolean;
   currentPath: string;
}

const DesktopAccount: FC<DesktopAccountProps> = ({ isLoggedIn, currentPath }) => (
   <div className={styles.account}>
      {isLoggedIn ? (
         <div className={styles.user}>
            <UserAvatar isLink width={25} height={25} />
         </div>
      ) : (
         <>
            <Link href={`/auth/login?page=${currentPath}`} prefetch={false}>
               <a className={styles.linkBtn}>
                  <button className={styles.login}>Iniciá Sesión</button>
               </a>
            </Link>
            <Link href={`/auth/register?page=${currentPath}`} prefetch={false}>
               <a className={styles.linkBtn}>
                  <button className={styles.register}>Registrarse</button>
               </a>
            </Link>
         </>
      )}
   </div>
);
