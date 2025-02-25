import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { MainLayout } from '../../components/layouts';

import { Categories, FeaturedPacks, HowItWorks, Promos } from '../../components/home';
import { BannerNeighborhood } from '../../components/home/neighborhood/BannerNeighborhood';
import { IntroNeighborhood } from '../../components/home/neighborhood/IntroNeighborhood';
import { ProductSlides } from '../../components/products';
import { CommonQuestions, Newsletter } from '../../components/ui';

import { generateNeighborhoodSeo, neighborhoods, slugToTitleCase } from '../../utils';

import styles from '../../styles/home/Home.module.scss';

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
         <section className={styles.home}>
            <BannerNeighborhood neighborhood={theNeighborhood} />

            <IntroNeighborhood neighborhood={theNeighborhood} />

            <Categories />

            <HowItWorks />

            <Promos />

            <FeaturedPacks />

            <ProductSlides products={products} />

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
