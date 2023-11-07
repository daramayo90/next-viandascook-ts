import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import { FiFacebook } from 'react-icons/fi';

import styles from '../../styles/Footer.module.css';

export const Footer = () => {
   const year = new Date().getFullYear();

   return (
      <section className={styles.footer}>
         <div className={styles.info}>
            <div className={styles.footerBrand}>
               <h2 className={styles.title}>Comida Saludable.</h2>
               <h2 className={styles.title}>Comida Práctica y Casera.</h2>
               <span className={styles.slogan}>¡Riquisimo!</span>
            </div>

            <div className={styles.columnList}>
               <ul className={styles.list}>
                  <Link href={'/como-funciona'}>
                     <a className={styles.linkItem}>¿Cómo funciona?</a>
                  </Link>
                  <Link href={'/nosotros'}>
                     <a className={styles.linkItem}>Nosotros</a>
                  </Link>
               </ul>

               <ul className={styles.list}>
                  <Link href={'/preguntas'}>
                     <a className={styles.linkItem}>¿Dudas?</a>
                  </Link>
                  <Link href={'/loyalty'}>
                     <a className={styles.linkItem}>Sumá puntos</a>
                  </Link>
               </ul>
            </div>

            <div className={styles.contact}>
               <div className={styles.support}>
                  <div className={styles.logo}>
                     <Image
                        src='/logo/viandascook-logo.png'
                        alt='logo'
                        width={180}
                        height={50}
                        priority={true}
                     />
                  </div>
                  <span className={styles.mail}>info@viandascook.com</span>
               </div>

               <div className={styles.socialMedia}>
                  <Link href={'https://instagram.com/viandascook'} passHref>
                     <a target='_blank' rel='nofollow'>
                        <AiOutlineInstagram className={styles.icon} />
                     </a>
                  </Link>
                  <Link href={'https://facebook.com/viandas.cook'} passHref>
                     <a target='_blank' rel='nofollow'>
                        <FiFacebook className={styles.icon} />
                     </a>
                  </Link>
                  <Link href={'https://wa.link/3dkum4'} passHref>
                     <a target='_blank' rel='nofollow'>
                        <AiOutlineWhatsApp className={styles.icon} />
                     </a>
                  </Link>
               </div>
            </div>
         </div>

         <div className={styles.legal}>
            <Link href='/terminos-y-condiciones'>
               <span className={styles.terms}>Términos y Condiciones</span>
            </Link>
            <span>© Copyright {year} Viandas Cook</span>
         </div>
      </section>
   );
};
