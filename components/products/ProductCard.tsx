import { FC, memo } from 'react';
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

const ProductCardComponent: FC<Props> = ({ product }) => {
   const info: any = product.nutritionalInfo;

   const {
      isSelecting,
      setIsSelecting,
      startSelecting,
      tempCartProduct,
      onNewCartQuantityValue,
      cartProduct,
   } = useTempCart(product);

   const isOutOfStock = !product.inStock;

   return (
      <article className={cartProduct ? `${styles.product} selected` : `${styles.product}`}>
         <article className={styles.card}>
            <Link href={`/plato/${product.slug}`}>
               <a className={styles.nextImage}>
                  <Image
                     src={product.image}
                     alt={product.name}
                     layout='fill'
                     objectFit='cover'
                     sizes='(max-width: 768px) 35vw, (min-width: 769px) 23vw'
                  />

                  {product.discountPrice && (
                     <div className={styles.tagImageWrapper}>
                        <Image
                           src='/img/15off-tag-bf.png'
                           alt='15% off - Cyber Monday'
                           layout='fill'
                           objectFit='fill'
                           sizes='(max-width: 768px) 35vw, (min-width: 769px) 23vw'
                        />
                     </div>
                  )}

                  {isOutOfStock && (
                     <div className={styles.tagImageWrapper}>
                        <Image
                           src='/img/sin-stock-tag.png'
                           alt='Sin Stock'
                           layout='fill'
                           objectFit='fill'
                           sizes='(max-width: 768px) 35vw, (min-width: 769px) 23vw'
                        />
                     </div>
                  )}
               </a>
            </Link>

            <div className={styles.info}>
               <Link href={`/plato/${product.slug}`}>
                  <div className={styles.name}>
                     <h4>
                        {product.name.length > 50
                           ? product.name.substring(0, 45) + '...'
                           : product.name}
                     </h4>
                  </div>
               </Link>

               <div className={styles.tags}>
                  <span>{info.Calorías} / </span>
                  <span>{info.Proteína} prot / </span>
                  <span>{info.Carbohidratos} carbo</span>
               </div>

               <div className={styles.price}>
                  {!product.inStock ? (
                     <></>
                  ) : product.discountPrice ? (
                     <>
                        <span className={styles.noPrice}>{currency.format(product.price)}</span>
                        <span className={styles.discount}>
                           {currency.format(product.discountPrice)}
                        </span>
                     </>
                  ) : (
                     <span>{currency.format(product.price)}</span>
                  )}
               </div>
            </div>
         </article>

         <div className={styles.addToCart}>
            {isOutOfStock ? (
               <></>
            ) : !isSelecting && !cartProduct ? (
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

export const ProductCard = memo(ProductCardComponent);

ProductCard.displayName = 'ProductCard';
