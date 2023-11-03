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

import { seo } from '../utils';

import styles from '../styles/Landing.module.css';

interface Props {
   products: IProduct[];
}

const LandingPage: NextPage<Props> = ({ products }) => {
   const { title, description, keywords } = seo['LandingPage'];

   return (
      <MainLayout title={title} pageDescription={description} keywords={keywords}>
         <section className={styles.landing}>
            <Banner />

            <Intro />

            <ProductSlides products={products} />

            <div className={styles.btn}>
               <Button href={'/menu'} content={'Más platos'} background='var(--secondary)' />
            </div>

            <Values />

            <div className={styles.btn}>
               <Button href={'/menu'} content={'¡Comprar!'} background='var(--secondary)' />
            </div>

            <HowToBuy />

            <div className={styles.btn}>
               <Button href={'/menu'} content={'¡Comprar!'} background='var(--secondary)' />
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
