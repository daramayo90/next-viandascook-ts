import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICartProduct, IProduct } from '../../interfaces';

import { ItemCounter } from '.';
import { currency } from '../../utils';
import { useTempCart } from '../../hooks';

import styles from '../../styles/Products2.module.css';

interface Props {
   product: IProduct;
}

export const ProductCard2: FC<Props> = ({ product }) => {
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
         <Link href={`/plato/${product.slug}`} prefetch={false}>
            <article className={styles.card}>
               {/* TODO: Out of Stock */}
               {product.inStock === false && <div className={styles.stock}>Sin stock</div>}

               <div className={styles.nextImage}>
                  <Image
                     src={`/products/${product.image}`}
                     alt={product.name}
                     width={100}
                     height={95}
                     priority
                  />
               </div>

               <div className={styles.info}>
                  <div className={styles.name}>
                     {/* <h4>{product.name}</h4> */}
                     <h4>
                        {product.name.length > 10
                           ? product.name.substring(0, 25) + '...'
                           : product.name}
                     </h4>
                  </div>

                  <div className={styles.tags}>
                     <span>{info.Calorías}</span>
                  </div>

                  <div className={styles.price}>
                     <span>{currency.format(product.price)}</span>
                  </div>
               </div>
            </article>
         </Link>

         <div className={styles.addToCart}>
            {!isSelecting && !cartProduct ? (
               <div
                  className={styles.selectQuantity}
                  onClick={() => startSelecting(cartProduct! as ICartProduct)}>
                  <span>+</span>
               </div>
            ) : isSelecting ? (
               <ItemCounter
                  currentValue={tempCartProduct.quantity}
                  updatedQuantity={(quantity) =>
                     onNewCartQuantityValue(cartProduct as ICartProduct, quantity)
                  }
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
