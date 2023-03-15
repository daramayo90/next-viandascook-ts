import { GetStaticProps, NextPage } from 'next';

import { MainLayout } from '../components/layouts';
import { ProductSlides } from '../components/products';
import {
   Banner,
   Button,
   CommonQuestions,
   HowToBuy,
   Intro,
   Newsletter,
   Values,
} from '../components/ui';

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

            <ProductSlides products={products} />

            <div className={styles.btn}>
               <Button
                  href={'/menu'}
                  content={'Más platos'}
                  background='var(--black)'
                  border='2px solid var(--black)'
               />
            </div>

            <Values />

            <div className={styles.btn}>
               <Button
                  href={'/menu'}
                  content={'¡Comprar!'}
                  background='var(--black)'
                  border='2px solid var(--black)'
               />
            </div>

            <HowToBuy />

            <div className={styles.btn}>
               <Button
                  href={'/menu'}
                  content={'¡Comprar!'}
                  background='var(--black)'
                  border='2px solid var(--black)'
               />
            </div>

            <CommonQuestions />

            <Newsletter />
         </section>
      </MainLayout>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getAllBestSellersProducts();

   return {
      props: { products },
   };
};

export default LandingPage;
