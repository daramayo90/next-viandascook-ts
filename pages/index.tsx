import type { NextPage } from 'next';

import { ShopLayout } from '../components/layouts';
import { Banner, Intro, Values } from '../components/ui';

import styles from '../styles/Landing.module.css';

const title = 'Viandas Saludables, Prácticas y Caseras';
const description =
   'Ofrecemos Viandas Saludables y Caseras, ¡del freezer a tu mesa en 15 minutos! Hacé tu vida más fácil y resolvé sin vueltas tus comidas.';

const LandingPage: NextPage = () => {
   return (
      <ShopLayout title={title} pageDescription={description}>
         <section className={styles.landing}>
            <Banner />

            <Intro />

            <Values />

            <div className={styles.viandascookpapa}></div>
         </section>
      </ShopLayout>
   );
};

export default LandingPage;
