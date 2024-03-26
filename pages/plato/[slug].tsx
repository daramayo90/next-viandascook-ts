import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { ga, meta } from '../../analytics';

import { ProductLayout } from '../../components/layouts';
import {
   AditionalInfo,
   ProductImg,
   Ingredients,
   NutritionInfo,
   Price,
   ProductSlides,
   Description,
} from '../../components/products';

import styles from '../../styles/Product.module.css';
import { Breadcrumbs } from '../../components/ui';

interface Props {
   product: IProduct;
   relatedProducts: IProduct[];
}

const title = 'Descubrí más: Viandas perfectas según tus gustos';

const ProductPage: NextPage<Props> = ({ product, relatedProducts }) => {
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
            <Breadcrumbs />
            <div className={styles.topSection}>
               <ProductImg product={product} />

               <div className={styles.container}>
                  <Description product={product} />
                  <Price product={product} />
               </div>
            </div>

            <div className={styles.bottomSection}>
               <Ingredients product={product} />

               <NutritionInfo product={product} />
            </div>

            <AditionalInfo />
         </article>

         <ProductSlides products={relatedProducts} title={title} />
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

   const relatedProducts = await dbProducts.getRelatedProducts(product);

   return {
      props: {
         product,
         relatedProducts,
      },
      revalidate: 10800, // Incremental Static Regeneration (ISR) - 3hs
   };
};
