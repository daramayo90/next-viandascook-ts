import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

import styles from '../../styles/Footer.module.css';

export const Footer = () => {
   const year = new Date().getFullYear();

   return (
      <section className={styles.footer}>
         <div className={styles.info}>
            <div className={styles.footerBrand}>
               <h2 className={styles.title}>Comida Saludable.</h2>
               <h2 className={styles.title}>Comida Práctica y Casera.</h2>
               <span className={styles.slogan}>¡Riquísima!</span>
            </div>

            <div className={styles.columnList}>
               <ul className={styles.list}>
                  <li>¿Cómo funciona?</li>
                  <li>Nosotros</li>
               </ul>
               <ul className={styles.list}>
                  <li>¿Preguntas?</li>
                  <li>Sumá puntos</li>
               </ul>
            </div>

            <div className={styles.contact}>
               <div className={styles.support}>
                  <img className={styles.logo} src='/logo/viandascook-logo.png' alt='logo' />
                  <span className={styles.mail}>info@viandascook.com</span>
               </div>

               <div className={styles.socialMedia}>
                  <AiOutlineInstagram className={styles.icon} />
                  <BsFacebook className={styles.icon} />
                  <AiOutlineWhatsApp className={styles.icon} />
               </div>
            </div>
         </div>

         <div className={styles.legal}>
            <span>Términos y Condiciones</span>
            <span>© Copyright {year} Viandas Cook</span>
         </div>
      </section>
   );
};
