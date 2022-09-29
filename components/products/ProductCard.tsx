import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICartProduct, IProduct } from '../../interfaces';

import { ItemCounter } from './';
import { currency } from '../../utils';
import { useTempCart } from '../../hooks';

import styles from '../../styles/Products.module.css';

interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   // TODO: Ver el tema any
   const info: any = product.nutritionalInfo;

   const { isSelecting, setIsSelecting, tempCartProduct, onNewCartQuantityValue, cartProduct } =
      useTempCart(product);

   return (
      <article className={cartProduct ? `${styles.product} selected` : `${styles.product}`}>
         <Link href={`/plato/${product.slug}`} prefetch={false}>
            <article className={styles.card}>
               {product.inStock === false && <div className={styles.stock}>Sin stock</div>}

               <div className={styles.nextImage}>
                  <Image
                     src={`/products/${product.image}`}
                     alt={product.name}
                     layout='fill'
                     priority
                  />
               </div>

               <div className={styles.tags}>
                  <div className={styles.tag}>
                     <span>{info.Calorías}</span>
                  </div>
               </div>
            </article>
         </Link>

         <article className={`${styles.box} fadeIn`}>
            <h4 className={styles.name}>{product.name}</h4>
            <div className={styles.container}>
               <h4 className={styles.price}>{currency.format(product.price)}</h4>

               {/* TODO: Out of Stock */}
               {!isSelecting && !cartProduct ? (
                  <div className={styles.selectedQuantity} onClick={() => setIsSelecting(true)}>
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
      </article>
   );
};
