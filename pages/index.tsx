import type { NextPage } from 'next';

import { ShopLayout } from '../components/layouts';
import { ProductSlides } from '../components/products';
import { Banner, CommonQuestions, HowToBuy, Intro, Values } from '../components/ui';

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

            <ProductSlides />

            <HowToBuy />

            <CommonQuestions />
         </section>
      </ShopLayout>
   );
};

export default LandingPage;
