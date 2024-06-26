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

            <div className={styles.columns}>
               <div className={styles.columnList}>
                  <div className={styles.list}>
                     <Link href={'/como-funciona'} prefetch={false}>
                        <a className={styles.linkItem}>¿Cómo funciona?</a>
                     </Link>
                     <Link href={'/nosotros'} prefetch={false}>
                        <a className={styles.linkItem}>Nosotros</a>
                     </Link>
                  </div>

                  <div className={styles.list}>
                     <Link href={'/preguntas'} prefetch={false}>
                        <a className={styles.linkItem}>¿Dudas?</a>
                     </Link>
                     <Link href={'/loyalty'} prefetch={false}>
                        <a className={styles.linkItem}>Sumá puntos</a>
                     </Link>
                  </div>
               </div>

               <div className={styles.columnList}>
                  <h3 className={styles.subTitle}>Platos más elegidos</h3>
                  <div className={styles.list}>
                     <Link href={'/plato/colita-de-cuadril-con-papas-al-horno'} prefetch={false}>
                        <a className={`${styles.linkItem} ${styles.productItem}`}>
                           Colita de cuadril con papas
                        </a>
                     </Link>
                     <Link href={'/plato/hamburguesas-con-papas-bravas-al-horno'} prefetch={false}>
                        <a className={`${styles.linkItem} ${styles.productItem}`}>
                           Hamburguesas con papas bravas al horno
                        </a>
                     </Link>
                     <Link href={'/plato/medallones-de-merluza-con-arroz-primavera'} prefetch={false}>
                        <a className={`${styles.linkItem} ${styles.productItem}`}>
                           Medallones de merluza con arroz primavera
                        </a>
                     </Link>
                  </div>

                  <div className={styles.list}>
                     <Link href={'/plato/bife-a-la-criolla-con-verduras'} prefetch={false}>
                        <a className={`${styles.linkItem} ${styles.productItem}`}>
                           Bife a la criolla con verduras
                        </a>
                     </Link>
                     <Link href={'/plato/lomo-al-champinion-con-papas-noisette'} prefetch={false}>
                        <a className={`${styles.linkItem} ${styles.productItem}`}>
                           Lomo al champiñón con papas noisette
                        </a>
                     </Link>
                     <Link href={'/plato/pollo-agridulce-con-vegetales'} prefetch={false}>
                        <a className={`${styles.linkItem} ${styles.productItem}`}>
                           Pollo agridulce con vegetales
                        </a>
                     </Link>
                  </div>
               </div>
            </div>

            <div className={styles.contact}>
               <div className={styles.support}>
                  <div className={styles.logo}>
                     <Image src='/logo/viandascook-logo.png' alt='logo' width={180} height={50} />
                  </div>
                  <span className={styles.mail}>info@viandascook.com</span>
               </div>

               <div className={styles.socialMedia}>
                  <Link href={'https://instagram.com/viandascook'} passHref prefetch={false}>
                     <a target='_blank' rel='nofollow' aria-label='Instagram link'>
                        <AiOutlineInstagram className={styles.icon} />
                     </a>
                  </Link>
                  <Link href={'https://facebook.com/viandas.cook'} passHref prefetch={false}>
                     <a target='_blank' rel='nofollow' aria-label='Facebook link'>
                        <FiFacebook className={styles.icon} />
                     </a>
                  </Link>
                  <Link href={'https://wa.link/3dkum4'} passHref prefetch={false}>
                     <a target='_blank' rel='nofollow' aria-label='Whatsapp link'>
                        <AiOutlineWhatsApp className={styles.icon} />
                     </a>
                  </Link>
               </div>
            </div>
         </div>

         <div className={styles.legal}>
            <Link href='/devoluciones-y-reembolsos' prefetch={false}>
               <span className={styles.refund}>Política de Devoluciones y Reembolsos</span>
            </Link>
            <Link href='/terminos-y-condiciones' prefetch={false}>
               <span className={styles.terms}>Términos y Condiciones</span>
            </Link>

            <span>© Copyright {year} Viandas Cook</span>
         </div>
      </section>
   );
};
