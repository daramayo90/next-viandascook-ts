import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

import styles from '../../styles/Footer.module.css';

export const Footer = () => {
   const year = new Date().getFullYear();

   return (
      <section className={styles.footer}>
         <div className={styles.footerBack}>
            <img src='/img/footer-mobile.jpg' alt='Viandas Cook Footer' />
         </div>

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

         <div className={styles.mail}>
            <span>info@viandascook.com</span>
         </div>

         <div className={styles.logo}>
            <img src='/logo/viandascook-logo.png' alt='viandascook-logo' />
         </div>

         <div className={styles.socialMedia}>
            <AiOutlineInstagram className={styles.icon} />
            <BsFacebook className={styles.icon} />
            <AiOutlineWhatsApp className={styles.icon} />
         </div>

         <div className={styles.copyright}>
            <span>Términos y Condiciones</span>
            <span>© Copyright {year} Viandas Cook</span>
         </div>
      </section>
   );
};
