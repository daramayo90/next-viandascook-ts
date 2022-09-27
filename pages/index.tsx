import { GetStaticProps, NextPage } from 'next';

import { MainLayout } from '../components/layouts';
import { ProductSlides } from '../components/products';
import { Banner, CommonQuestions, HowToBuy, Intro, Values } from '../components/ui';

import { dbProducts } from '../database';
import { IProduct } from '../interfaces';

import styles from '../styles/Landing.module.css';

const title = 'Viandas Saludables, Prácticas y Caseras';
const description =
   'Ofrecemos Viandas Saludables y Caseras, ¡del freezer a tu mesa en 15 minutos! Hacé tu vida más fácil y resolvé sin vueltas tus comidas.';

interface Props {
   products: IProduct[];
}

const LandingPage: NextPage<Props> = ({ products }) => {
   return (
      <MainLayout title={title} pageDescription={description}>
         <section className={styles.landing}>
            <Banner />

            <Intro />

            <Values />

            <ProductSlides products={products} />

            <HowToBuy />

            <CommonQuestions />
         </section>
      </MainLayout>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getAllProducts();

   return {
      props: { products },
   };
};

export default LandingPage;
