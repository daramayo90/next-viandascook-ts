import { FC } from 'react';
import { ICartProduct, IProduct } from '../../interfaces';

import { ItemCounter } from '../products';
import { useTempCart } from '../../hooks';
import { currency } from '../../utils';

import styles from '../../styles/CrossSelling.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
   product: IProduct;
}

export const CrossSellingProduct: FC<Props> = ({ product }) => {
   const { isSelecting, startSelecting, tempCartProduct, onNewCartQuantityValue, cartProduct } =
      useTempCart(product);

   const transformName = (product: IProduct) => {
      const productName = product.name.toLowerCase();

      // return productName;

      if (productName.includes('integral')) return 'Integral x4';
      if (productName.includes('banana')) return 'Banana x4';
      if (productName.includes('manzana')) return 'Manzana x4';
      if (productName.includes('clásico')) return 'Clásico x4';
      if (productName.includes('cacao')) return 'Cacao x4';
   };

   return (
      <div className={styles.product}>
         <Link href={`/plato/${product.slug}`} passHref>
            <a className={styles.info} target='_blank'>
               <div className={styles.nextImage}>
                  <Image src={product.image} alt={product.name} width={200} height={200} />
                  {product.discountPrice && (
                     <div className={styles.tagImageWrapper}>
                        <Image
                           src='/img/15off-tag-bf.png'
                           alt='15% off - Cyber Monday'
                           width={200}
                           height={200}
                           priority={true}
                        />
                     </div>
                  )}
               </div>
               <p className={styles.name}>{transformName(product)}</p>
               <div className={styles.priceContainer}>
                  {product.discountPrice ? (
                     <>
                        <p className={styles.noPrice}>{currency.format(product.price)}</p>
                        <p className={styles.discount}>{currency.format(product.discountPrice)}</p>
                     </>
                  ) : (
                     <p className={styles.price}>{currency.format(product.price)}</p>
                  )}
               </div>
            </a>
         </Link>

         {!isSelecting && !cartProduct ? (
            <div
               className={styles.addToCart}
               onClick={() => startSelecting(cartProduct! as ICartProduct)}>
               <p>Agregar al carrito</p>
            </div>
         ) : (
            <ItemCounter
               currentValue={cartProduct ? cartProduct.quantity : tempCartProduct.quantity}
               updatedQuantity={(quantity) =>
                  onNewCartQuantityValue(cartProduct as ICartProduct, quantity)
               }
               product={product}
            />
         )}
      </div>
   );
};
