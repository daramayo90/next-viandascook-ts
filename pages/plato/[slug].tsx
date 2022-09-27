import { useContext, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { dbProducts } from '../../database';
import { ICartProduct, IProduct } from '../../interfaces';

import { CartContext } from '../../context';

import { currency } from '../../utils';
import { ItemCounter } from '../../components/products';

import { BsArrowLeftShort } from 'react-icons/bs';
import { BiChevronLeft } from 'react-icons/bi';

import styles from '../../styles/Product.module.css';
import { CartMenu } from '../../components/cart';

interface Props {
   product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
   const router = useRouter();

   const { cart, addProductToCart } = useContext(CartContext);

   const [selectMore, setSelectMore] = useState(true);

   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      image: product.image,
      name: product.name,
      slug: product.slug,
      price: product.price,
      type: product.type,
      quantity: 0,
   });

   const onUpdatedQuantity = (quantity: number) => {
      setTempCartProduct((currentProduct) => ({
         ...currentProduct,
         quantity,
      }));
   };

   const onAddProduct = () => {
      if (tempCartProduct.quantity === 0 || !selectMore) return;

      addProductToCart(tempCartProduct);

      setSelectMore(false);
   };

   useEffect(() => {
      if (cartProduct) {
         setSelectMore(false);
      }
   }, [cart]);

   useEffect(() => {
      const cartProduct = cart.find((p) => product._id === p._id);

      setTempCartProduct((currentProduct) => ({
         ...currentProduct,
         quantity: cartProduct ? cartProduct.quantity : 0,
      }));
   }, [cart]);

   const cartProduct = cart.find((p) => product._id === p._id);

   return (
      <>
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
                  <div className={styles.nextImage}>
                     <Image
                        src={`/products/${product.image}`}
                        alt={product.name}
                        width={100}
                        height={75}
                        layout='responsive'
                        priority
                     />
                  </div>
               </div>

               {/* Price and Cart */}
               <div className={styles.container}>
                  <h1 className={styles.title}>{product.name}</h1>
                  <h4 className={styles.price}>{currency.format(product.price)}</h4>
                  {!cartProduct || selectMore ? (
                     <ItemCounter
                        currentValue={tempCartProduct.quantity}
                        updatedQuantity={onUpdatedQuantity}
                     />
                  ) : (
                     <div className={styles.selectedQuantity} onClick={() => setSelectMore(true)}>
                        <span>{cartProduct.quantity}</span>
                     </div>
                  )}
               </div>

               {/* TODO: Out of Stock */}
               <button className={styles.addToCart} onClick={onAddProduct}>
                  Agregar al carrito
               </button>
            </div>

            {/* Tags */}

            <div className={styles.bottomSection}>
               <div className={styles.ingredients}>
                  <h3 className={styles.subTitle}>Ingredientes</h3>

                  <div className={styles.container}>
                     {product.ingredients.map((ingredient, index) => (
                        <div key={index} className={styles.ingredient}>
                           <span>{ingredient}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className={styles.nutrition}>
                  <h3 className={styles.subTitle}>Información Nutricional</h3>

                  {Object.entries(product.nutritionalInfo).map((nutrition, index) => (
                     <div key={index} className={styles.nutritionInfo}>
                        <span>{nutrition[0]}</span>
                        <span>{nutrition[1]}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className={styles.info}>
               <div className={styles.delivery}>
                  <div className={styles.icon}>
                     <div className={styles.nextImage}>
                        <Image
                           src='/img/icons/frozen.png'
                           alt='Platos Congelados'
                           width={100}
                           height={100}
                        />
                     </div>
                  </div>

                  <div className={styles.content}>
                     <h4 className={styles.title}>Los platos son enviados congelados</h4>
                     <span className={styles.text}>
                        Se entregan en bolsas envasadas al vacío, que ayudan a preservar los
                        alimentos y su sabor
                     </span>
                  </div>
               </div>

               <div className={styles.heat}>
                  <div className={styles.icon}>
                     <div className={styles.nextImage}>
                        <Image
                           src='/img/icons/heat.png'
                           alt='Como calentar'
                           width={100}
                           height={100}
                        />
                     </div>
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
         <CartMenu />
      </>
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
