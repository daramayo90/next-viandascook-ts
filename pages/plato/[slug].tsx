import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { ga, meta } from '../../utils';

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
   const title = '';
   const description = `Disfrutá de nuestro delicioso ${product.name} por solo $${product.price}.`;

   useEffect(() => {
      ga.event({
         action: 'view_item',
         currency: 'ARS',
         items: [
            {
               item_id: product._id,
               item_name: product.name,
               affiliation: 'Viandas Cook Store',
               currency: 'ARS',
               price: product.price,
               quantity: 1,
            },
         ],
         value: product.price,
      });

      meta.viewItem(product);
   }, [product]);

   return (
      <ProductLayout product={product}>
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
      revalidate: 10800, // Incremental Static Regeneration (ISR) - 3hs
   };
};
