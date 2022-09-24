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

               <Button content='¡Quiero!' />

               <h4 className={styles.discount}>
                  <span>10% OFF EN TU PRIMER PEDIDO.</span>
                  <span>
                     CUPÓN: <strong>BIENVENIDO10</strong>
                  </span>
               </h4>
            </div>

            <div className={styles.bannerDishes}>
               <img src='/img/banner-dishes.png' alt='viandascook-banner-back' />
            </div>
         </div>
      </section>
   );
};
