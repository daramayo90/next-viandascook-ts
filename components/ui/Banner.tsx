import Image from 'next/image';

import { Button } from './Button';

import styles from '../../styles/Banner.module.css';

export const Banner = () => {
   return (
      <section className={styles.banner}>
         <div className={styles.container}>
            <div className={styles.brand}>
               <h1 className={styles.title}>Viandas Saludables</h1>
               <p className={styles.slogan}>
                  <span>¡Hacé que tu día</span>
                  <span> tenga sabor!</span>
               </p>

               <div className={styles.button}>
                  <Button href='/menu' content='¡Quiero!' />
               </div>

               <h4 className={styles.discount}>
                  <span>10% OFF EN TU PRIMER PEDIDO.</span>
                  <span>
                     CUPÓN: <strong>BIENVENIDO10</strong>
                  </span>
               </h4>
            </div>

            <div className={styles.bannerDishes}>
               <div className={styles.nextImage}>
                  <Image
                     src='/img/banner-dishes.png'
                     alt='viandascook-banner-back'
                     width={800}
                     height={800}
                     layout='intrinsic'
                  />
               </div>
            </div>
         </div>
      </section>
   );
};
