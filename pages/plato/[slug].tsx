import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { ga, currency } from '../../utils';

import { ProductLayout } from '../../components/layouts';
import {
   AditionalInfo,
   ProductImg,
   Ingredients,
   NutritionInfo,
   Price,
} from '../../components/products';

import styles from '../../styles/Product.module.css';

interface Props {
   product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
   useEffect(() => {
      ga.event({
         action: 'view_product',
         category: 'Product',
         label: product.name,
      });
   }, [product]);

   return (
      <ProductLayout title={'Viandas Cook - ' + product.name} pageDescription={''}>
         <article className={styles.product}>
            <div className={styles.topSection}>
               <ProductImg product={product} />

               <Price product={product} />
            </div>

            <div className={styles.bottomSection}>
               <Ingredients product={product} />

               <NutritionInfo product={product} />
            </div>

            <AditionalInfo />
         </article>
      </ProductLayout>
   );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
   const slugs = await dbProducts.getAllProductSlug();

   return {
      paths: slugs.map(({ slug }) => ({
         params: { slug },
      })),
      fallback: 'blocking',
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { slug = '' } = params as { slug: string };

   const product = await dbProducts.getProductBySlug(slug);

   // Incremental Static Generation (ISG)
   if (!product) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }

   return {
      props: {
         product,
      },
      revalidate: 86400, // Incremental Static Regeneration (ISR) - 24hs
   };
};
