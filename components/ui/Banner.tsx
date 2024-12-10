import Image from 'next/image';

import { Button } from './Button';
import { cloudImagesPath } from '../../utils';

import styles from '../../styles/Banner.module.css';

export const Banner = () => {
   return (
      <section className={styles.banner}>
         <Image
            src={`${cloudImagesPath}/l7pxb4l3eftmhwrgqq4l.jpg`}
            // src='/img/navidad-banner-viandascook.jpg'
            alt='Viandas Cook - Banner'
            layout='fill'
            objectFit='cover'
            priority
         />

         <div className={styles.overlay}></div>

         <div className={styles.container}>
            <div className={styles.brand}>
               <h1 className={styles.title}>Viandas Saludables</h1>
               <p className={styles.slogan}>
                  <span>Hace que tu dia</span>
                  <span> tenga sabor!</span>
               </p>

               <p className={styles.epigraph}>
                  Disfrutá de nuestras <strong>comidas</strong> frescas, caseras y entregadas{' '}
                  <strong>a domicilio en CABA.</strong>
               </p>

               <div className={styles.button}>
                  <Button href='/menu' content='Ver el menú' color='white' border='2px white solid' />
               </div>
            </div>

            <div className={styles.bannerDishes}>
               <div className={styles.nextImage}>
                  <Image
                     src={`${cloudImagesPath}/l4oxi04a73ols8locaxw.png`}
                     alt='viandascook-banner-back'
                     priority={true}
                     quality={80}
                     layout='fill'
                     sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw'
                  />
               </div>
            </div>
         </div>
      </section>
   );
};
