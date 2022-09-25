import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { currency } from '../../utils';
import { ItemCounter } from '../../components/products';

import { BsArrowLeftShort } from 'react-icons/bs';
import { GiFrozenOrb } from 'react-icons/gi';
import styles from '../../styles/Product.module.css';
import { BiChevronLeft } from 'react-icons/bi';
import { useRouter } from 'next/router';

interface Props {
   product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
   const router = useRouter();

   return (
      <article className={styles.product}>
         {/* TODO: Agregar Layout nuevo */}
         {/* TODO: Mantener los filtros */}

         <div className={styles.backMobile} onClick={() => router.back()}>
            <BiChevronLeft />
         </div>

         <div className={styles.backDesktop} onClick={() => router.back()}>
            <BsArrowLeftShort />
            <span className={styles.text}>Volver</span>
         </div>

         <div className={styles.topSection}>
            {/* Title */}

            {/* Image */}
            <div className={styles.image}>
               <img src={`/products/${product.image}`} alt={product.name} />
            </div>

            {/* Price and Cart */}
            <div className={styles.container}>
               <h1 className={styles.title}>{product.name}</h1>
               <h4 className={styles.price}>{currency.format(product.price)}</h4>
               <ItemCounter />
            </div>
         </div>

         {/* Tags */}

         <div className={styles.bottomSection}>
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

            <div className={styles.nutrition}>
               <h3 className={styles.subTitle}>Información Nutricional</h3>

               {Object.entries(product.nutritionalInfo).map((nutrition) => (
                  <div className={styles.nutritionInfo}>
                     <span>{nutrition[0]}</span>
                     <span>{nutrition[1]}</span>
                  </div>
               ))}
            </div>
         </div>

         <div className={styles.info}>
            <div className={styles.delivery}>
               <div className={styles.icon}>
                  <img src='/img/icons/frozen.png' alt='Platos Congelados' />
               </div>

               <div className={styles.content}>
                  <h4 className={styles.title}>Los platos son enviados congelados</h4>
                  <span className={styles.text}>
                     Se entregan en bolsas envasadas al vacío, que ayudan a preservar los alimentos
                     y su sabor
                  </span>
               </div>
            </div>

            <div className={styles.heat}>
               <div className={styles.icon}>
                  <img src='/img/icons/heat.png' alt='Como calentar' />
               </div>

               <div className={styles.content}>
                  <h4 className={styles.title}>¿Cómo calentar?</h4>
                  <span className={styles.text}>
                     Preparación y cocción: 10 minutos en agua hirviendo
                  </span>
               </div>
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
