import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import { FiFacebook } from 'react-icons/fi';

import styles from '../../styles/footer/Footer.module.scss';
import { Button } from './Button';
import { useContext } from 'react';
import { AuthContext } from '../../context';

export const Footer = () => {
   const { isLoggedIn } = useContext(AuthContext);

   const year = new Date().getFullYear();

   return (
      <section className={styles.footer}>
         <div className={styles.info}>
            <div className={styles.nextImage}>
               <Image
                  src='/logo/viandascook-logo.png'
                  alt='viandascook-logo'
                  width={100}
                  height={25}
                  layout='responsive'
                  priority={true}
               />
            </div>

            <div className={styles.columns}>
               <div className={styles.columnList}>
                  <div className={styles.footerBrand}>
                     <p className={styles.title}>
                        COMIDAS CASERAS, PRÁCTICAS Y SALUDABLES PARA HACER TU VIDA <br></br>¡MÁS FÁCIL
                        Y RICA!
                     </p>
                     <div className={styles.button}>
                        <Button
                           href={isLoggedIn ? '/mi-cuenta' : '/auth/login'}
                           content={isLoggedIn ? 'Mi Cuenta' : 'Iniciá sesión'}
                           color='var(--primaryShinny)'
                           weight={500}
                           border='1px var(--primaryShinny) solid'
                        />
                     </div>
                  </div>
               </div>

               <div className={styles.columnList}>
                  <h4 className={styles.columnTitle}>Elegí tus viandas</h4>
                  <ul className={styles.list}>
                     <Link href='/menu' prefetch={false}>
                        <li className={styles.linkItem}>Menú</li>
                     </Link>
                     <Link href='/descuentos' prefetch={false}>
                        <li className={styles.linkItem}>Descuentos</li>
                     </Link>
                     <Link href='/loyalty' prefetch={false}>
                        <li className={styles.linkItem}>Sumá puntos</li>
                     </Link>
                  </ul>
               </div>

               <div className={styles.columnList}>
                  <h4 className={styles.columnTitle}>Los favoritos de nuestros clientes</h4>
                  <ul className={`${styles.list} ${styles.favoritesList}`}>
                     <Link href='/plato/colita-de-cuadril-con-papas-al-horno' prefetch={false}>
                        <li className={styles.linkItem}>Colita de cuadril con papas</li>
                     </Link>
                     <Link href='/plato/hamburguesas-con-papas-bravas-al-horno' prefetch={false}>
                        <li className={styles.linkItem}>Hamburguesas con papas bravas al horno</li>
                     </Link>
                     <Link href='/plato/medallones-de-merluza-con-arroz-primavera' prefetch={false}>
                        <li className={styles.linkItem}>Medallones de merluza con arroz primavera</li>
                     </Link>
                     <Link href='/plato/bife-a-la-criolla-con-verduras' prefetch={false}>
                        <li className={styles.linkItem}>Bife a la criolla con verduras</li>
                     </Link>
                     <Link href='/plato/lomo-al-champinion-con-papas-noisette' prefetch={false}>
                        <li className={styles.linkItem}>Lomo al champiñón con papas noisette</li>
                     </Link>
                     <Link href='/plato/pollo-agridulce-con-vegetales' prefetch={false}>
                        <li className={styles.linkItem}>Pollo agridulce con vegetales</li>
                     </Link>
                  </ul>
               </div>

               <div className={styles.columnList}>
                  <h4 className={styles.columnTitle}>Información</h4>
                  <ul className={styles.list}>
                     <Link href='/nosotros' prefetch={false}>
                        <li className={styles.linkItem}>Nosotros</li>
                     </Link>
                     <li className={styles.linkItem}>Zonas de envío</li>
                     <Link href='/como-funciona' prefetch={false}>
                        <li className={styles.linkItem}>Cómo funciona nuestro servicio</li>
                     </Link>
                     <Link href='/preguntas' prefetch={false}>
                        <li className={styles.linkItem}>Preguntas frecuentes</li>
                     </Link>
                     <Link href='/blog' prefetch={false}>
                        <li className={styles.linkItem}>Blog</li>
                     </Link>
                  </ul>
               </div>

               <div className={styles.columnList}>
                  <h4 className={styles.columnTitle}>¡Contactanos!</h4>
                  <a href='mailto:info@viandascook.com' className={styles.mail}>
                     info@viandascook.com
                  </a>

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
         </div>

         <div className={styles.legal}>
            <Link href='/devoluciones-y-reembolsos' prefetch={false}>
               <span className={styles.refund}>Devoluciones y Reembolsos</span>
            </Link>
            <Link href='/terminos-y-condiciones' prefetch={false}>
               <span className={styles.terms}>Términos y Condiciones</span>
            </Link>

            <span>© Copyright {year} Viandas Cook</span>
         </div>
      </section>
   );
};
