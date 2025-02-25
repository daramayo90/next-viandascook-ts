import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { generateNeighborhoodSeo, neighborhoods, slugToTitleCase } from '../../utils';
import { MainLayout } from '../../components/layouts';
import { ProductSlides } from '../../components/products';

import { Values, AditionalInfo, CommonQuestions, Newsletter, Button } from '../../components/ui';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import styles from '../../styles/Landing.module.css';
import { BannerNeighborhood } from '../../components/home/neighborhood/BannerNeighborhood';
import { IntroNeighborhood } from '../../components/home/neighborhood/IntroNeighborhood';
import { HowItWorks } from '../../components/home';

interface Props {
   theNeighborhood: string;
   products: IProduct[];
   seo: {
      title: string;
      description: string;
      keywords: string;
      canonical: string;
   };
}

const NeighborhoodPage: NextPage<Props> = ({ theNeighborhood, products, seo }) => {
   const { title, description, keywords, canonical } = seo;

   const index = theNeighborhood === 'Belgrano' || theNeighborhood === 'Palermo' ? true : false;

   return (
      <MainLayout
         title={title}
         pageDescription={description}
         keywords={keywords}
         can={canonical}
         index={index}>
         <section className={styles.landing}>
            <BannerNeighborhood neighborhood={theNeighborhood} />

            <IntroNeighborhood neighborhood={theNeighborhood} />

            <HowItWorks />

            <p className={styles.noSubscriptionInfo}>
               ¿Querés pedir tus viandas a domicilio y empezar a ahorrar tiempo a partir de hoy?
            </p>

            <div className={styles.btn}>
               <Button
                  href={'/como-funciona'}
                  content={'Comenzá Ya'}
                  background='var(--secondary)'
                  color='white'
               />
            </div>

            <ProductSlides products={products} />

            <div className={styles.btn}>
               <Button
                  href={'/menu'}
                  content={'¡Más platos!'}
                  background='var(--secondary)'
                  color='white'
               />
            </div>

            <Values />

            <div className={styles.btn}>
               <Button
                  href={'/menu'}
                  content={'¡Comprar!'}
                  background='var(--secondary)'
                  color='white'
               />
            </div>

            <AditionalInfo />

            <CommonQuestions />

            <Newsletter />
         </section>
      </MainLayout>
   );
};

export const getStaticPaths: GetStaticPaths = async () => {
   const paths = neighborhoods.map((neighborhood) => ({
      params: { neighborhood },
   }));

   return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { neighborhood } = params as { neighborhood: string };

   const theNeighborhood = slugToTitleCase(neighborhood);

   const seo = generateNeighborhoodSeo(neighborhood);

   const products = await dbProducts.getAllBestSellersProducts();

   return {
      props: {
         theNeighborhood,
         seo,
         products,
      },
   };
};

export default NeighborhoodPage;
