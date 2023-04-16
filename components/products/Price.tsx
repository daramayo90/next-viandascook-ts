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
      <div className={styles.container}>
         <h1 className={styles.title}>{product.name}</h1>
         <h4 className={styles.price}>{currency.format(product.price)}</h4>

         {/* TODO: Out of Stock */}
         {!isSelecting && !cartProduct ? (
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
   );
};
