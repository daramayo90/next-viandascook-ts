import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { generateNeighborhoodSeo, neighborhoods, slugToTitleCase } from '../../utils';
import { MainLayout } from '../../components/layouts';
import { ProductSlides } from '../../components/products';

import {
   BannerNeighborhood,
   IntroNeighborhood,
   HowToBuy,
   Values,
   AditionalInfo,
   CommonQuestions,
   Newsletter,
   Button,
} from '../../components/ui';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import styles from '../../styles/Landing.module.css';

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

   return (
      <MainLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.landing}>
            <BannerNeighborhood neighborhood={theNeighborhood} />

            <IntroNeighborhood neighborhood={theNeighborhood} />

            <HowToBuy />

            <p className={styles.noSubscriptionInfo}>
               Elegí tus comidas sin la necesidad de suscribirte. Tenemos de todo, carne, veggie, ¡lo
               que quieras! Pedí ahora comida rica y saludable.
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
                  content={'Más platos'}
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
