import type { NextPage } from 'next';
import Link from 'next/link';

import { ShopLayout } from '../components/layouts';

import styles from '../styles/Landing.module.css';

const title = 'Viandas Saludables, Prácticas y Caseras';
const description =
   'Ofrecemos Viandas Saludables y Caseras, ¡del freezer a tu mesa en 15 minutos! Hacé tu vida más fácil y resolvé sin vueltas tus comidas.';

const Landing: NextPage = () => {
   return (
      <ShopLayout title={title} pageDescription={description}>
         <section className={styles.landing}>
            <div className={styles.container}>
               <div className={styles.bannerBack}>
                  <img src='/img/banner-back-mobile.jpg' alt='viandascook-banner-back' />
               </div>

               <div className={styles.bannerDishes}>
                  <img src='/img/banner-dishes.png' alt='viandascook-banner-back' />
               </div>
            </div>

            <div className={styles.brand}>
               <h1 className={styles.title}>Viandas Saludables</h1>
               <span className={styles.slogan}>¡Hacé que tu día</span>
               <span className={styles.slogan}>tenga sabor!</span>
            </div>

            <Link href='/'>
               <div className={styles.linkTo}>
                  <button className={styles.linkButton}>¡Quiero!</button>
               </div>
            </Link>

            <div className={styles.viandascookpapa}></div>
         </section>
      </ShopLayout>
   );
};

export default Landing;
