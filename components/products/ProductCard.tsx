import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICartProduct, IProduct } from '../../interfaces';

import { ItemCounter } from '.';
import { currency } from '../../utils';
import { useTempCart } from '../../hooks';

import styles from '../../styles/ProductCard.module.css';

interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   // TODO: Ver el tema any
   const info: any = product.nutritionalInfo;

   const {
      isSelecting,
      setIsSelecting,
      startSelecting,
      tempCartProduct,
      onNewCartQuantityValue,
      cartProduct,
   } = useTempCart(product);

   return (
      <article className={cartProduct ? `${styles.product} selected` : `${styles.product}`}>
         <article className={styles.card}>
            {/* TODO: Out of Stock */}
            {product.inStock === false && <div className={styles.stock}>Sin stock</div>}

            <Link href={`/plato/${product.slug}`} prefetch={false}>
               <div className={styles.nextImage}>
                  <Image
                     src={product.image}
                     alt={product.name}
                     width={750}
                     height={900}
                     priority={true}
                  />

                  <div className={styles.tagImageWrapper}>
                     <Image
                        src='/img/10off-tag.png'
                        alt='Tarta de atún - Promo Lanzamiento'
                        width={750}
                        height={900}
                        priority={true}
                     />
                  </div>
               </div>
            </Link>

            <div className={styles.info}>
               <div className={styles.name}>
                  <h4>
                     {product.name.length > 50
                        ? product.name.substring(0, 45) + '...'
                        : product.name}
                  </h4>
               </div>

               <div className={styles.tags}>
                  <span>{info.Calorías} / </span>
                  <span>{info.Proteína} prot / </span>
                  <span>{info.Carbohidratos} carbo</span>
               </div>

               <div className={styles.price}>
                  <span>{currency.format(product.price)}</span>
               </div>
            </div>
         </article>

         <div className={styles.addToCart}>
            {!isSelecting && !cartProduct ? (
               <div
                  className={styles.selectQuantity}
                  onClick={() => startSelecting(cartProduct! as ICartProduct)}>
                  <span>+</span>
               </div>
            ) : isSelecting ? (
               <ItemCounter
                  currentValue={cartProduct ? cartProduct.quantity : tempCartProduct.quantity}
                  updatedQuantity={(quantity) =>
                     onNewCartQuantityValue(cartProduct as ICartProduct, quantity)
                  }
                  product={product}
               />
            ) : (
               <div className={styles.selectedQuantity} onClick={() => setIsSelecting(true)}>
                  <span>{cartProduct!.quantity}</span>
               </div>
            )}
         </div>
      </article>
   );
};
