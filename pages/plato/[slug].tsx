import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { currency } from '../../utils';
import { ItemCounter } from '../../components/products';

import styles from '../../styles/Product.module.css';

interface Props {
   product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
   return (
      <article className={styles.product}>
         {/* TODO: Agregar Layout nuevo */}

         <div className={styles.topSection}>
            {/* Title */}
            <h1 className={styles.title}>{product.name}</h1>

            {/* Image */}
            <div className={styles.image}>
               <img src={`/products/${product.image}`} alt={product.name} />
            </div>

            {/* Price and Cart */}
            <div className={styles.container}>
               <h4 className={styles.price}>{currency.format(product.price)}</h4>
               <ItemCounter />
            </div>
         </div>

         <div className={styles.bottomSection}>
            {/* Tags */}

            {/* Ingredients */}
            <div className={styles.ingredients}>
               <h3 className={styles.subTitle}>Ingredientes</h3>

               <div className={styles.container}>
                  {product.ingredients.map((ingredient) => (
                     <div className={styles.ingredient}>
                        <span>{ingredient}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Nutrional Info */}
            <div className={styles.nutrition}>
               <h3 className={styles.subTitle}>Información Nutricional</h3>

               {Object.entries(product.nutritionalInfo).map((nutrition) => (
                  <div className={styles.nutritionInfo}>
                     <span>{nutrition[0]}</span>
                     <span>{nutrition[1]}</span>
                  </div>
               ))}
            </div>

            {/* Heating Instruction */}
            <div className={styles.howToHeat}>
               <h4>¿Cómo calentar?</h4>
               <p>{product.howToHeat}</p>
            </div>
         </div>
      </article>
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
