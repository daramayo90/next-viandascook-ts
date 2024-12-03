import { FC } from 'react';

import { ICartProduct, IProduct } from '../../interfaces';

import { useTempCart } from '../../hooks';
import { ItemCounter } from './ItemCounter';
import { currency } from '../../utils';

import styles from '../../styles/Product.module.css';

interface Props {
   product: IProduct;
}

export const Price: FC<Props> = ({ product }) => {
   const { isSelecting, startSelecting, tempCartProduct, onNewCartQuantityValue, cartProduct } =
      useTempCart(product);

   return (
      <>
         <h1 className={styles.title}>{product.name}</h1>

         <div className={styles.priceAndQuantity}>
            <div className={styles.priceContainer}>
               {!product.inStock ? (
                  <></>
               ) : product.discountPrice ? (
                  <>
                     <h3 className={styles.noPrice}>{currency.format(product.price)}</h3>
                     <h3 className={styles.discount}>{currency.format(product.discountPrice)}</h3>
                  </>
               ) : (
                  <h3 className={styles.price}>{currency.format(product.price)}</h3>
               )}
            </div>

            {!product.inStock ? (
               <div className={styles.outOfStockMessage}>
                  <span>Sin Stock</span>
               </div>
            ) : !isSelecting && !cartProduct ? (
               <div
                  className={styles.selectedQuantity}
                  onClick={() => startSelecting(cartProduct! as ICartProduct)}>
                  <span className={styles.addToCartMobile}>+</span>
                  <span className={styles.addToCartDesktop}>Agregar al carrito</span>
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
      </>
   );
};
