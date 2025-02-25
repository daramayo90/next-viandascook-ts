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

import styles from '../../styles/products/Product.module.scss';
import { Breadcrumbs } from '../../components/ui';

interface Props {
   product: IProduct;
}

const PackPage: NextPage<Props> = ({ product }) => {
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
      </ProductLayout>
   );
};

export default PackPage;

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

   const productsInPack = await dbProducts.getProductsInPack(product);

   if (!productsInPack) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }

   // console.log(JSON.stringify(productsInPack, null, 2));

   // const relatedProducts = await dbProducts.getRelatedProducts(product);

   return {
      props: {
         product,
         productsInPack,
         // relatedProducts,
      },
      revalidate: 10800, // Incremental Static Regeneration (ISR) - 3hs
   };
};
