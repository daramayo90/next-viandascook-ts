import React, { Suspense, lazy } from 'react';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import { MainLayout } from '../components/layouts';
import { ProductSlides } from '../components/products';
import { Banner, Button, Intro } from '../components/ui';

import { dbProducts } from '../database';
import { IProduct } from '../interfaces';

import { seo } from '../utils';

import styles from '../styles/Landing.module.css';

// Lazy load with explicit type declaration
const Values = lazy(() =>
   import('../components/ui/Values').then((module) => ({ default: module.Values })),
);
const HowToBuy = lazy(() =>
   import('../components/ui/HowToBuy').then((module) => ({ default: module.HowToBuy })),
);
const CommonQuestions = lazy(() =>
   import('../components/ui/CommonQuestions').then((module) => ({ default: module.CommonQuestions })),
);
const Newsletter = lazy(() =>
   import('../components/ui/Newsletter').then((module) => ({ default: module.Newsletter })),
);

interface Props {
   products: IProduct[];
}

const LandingPage: NextPage<Props> = ({ products }) => {
   const { title, description, keywords, canonical } = seo['LandingPage'];

   return (
      <MainLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.landing}>
            <Banner />

            <Intro />

            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
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
