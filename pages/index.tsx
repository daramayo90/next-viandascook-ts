import { GetStaticProps, NextPage } from 'next';

import { Banner, Categories, Intro, HowItWorks, Promos, FeaturedPacks } from '../components/home';
import { MainLayout } from '../components/layouts';
import { ProductSlides } from '../components/products';
import { Button, CommonQuestions, Newsletter, Values } from '../components/ui';

import { dbProducts } from '../database';
import { IProduct } from '../interfaces';

import { seo } from '../utils';

import styles from '../styles/home/Home.module.scss';

interface Props {
   products: IProduct[];
}

const HomePage: NextPage<Props> = ({ products }) => {
   const { title, description, keywords, canonical } = seo['HomePage'];

   return (
      <MainLayout
         title={title}
         pageDescription={description}
         keywords={keywords}
         can={canonical}
         index>
         <section className={styles.home}>
            <Banner />

            <Intro />

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

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getAllBestSellersProducts();

   return {
      props: { products },
   };
};

export default HomePage;
