import { FC, useContext } from 'react';
import Image from 'next/image';

import { CartContext } from '../../context/cart';

import { ItemCounter } from '../products';
import { ICartProduct } from '../../interfaces';
// import { ICartProduct, IOrderItem } from '../../interfaces';

import { currency } from '../../utils';

import styles from '../../styles/CartList.module.css';

interface Props {
   editable?: boolean;
   // products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false }) => {
   const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

   const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
      product.quantity = newQuantityValue;
      updateCartQuantity(product);

      if (product && product.quantity === 0) {
         removeCartProduct(product);
      }
   };

   // const productsToShow = products ? products : cart;

   // TODO: Ordenar los productos por id
   return (
      <section className={styles.cartList}>
         {cart.map((product) => (
            <article key={product._id} className={styles.product}>
               <div className={styles.details}>
                  <div className={styles.nextImage}>
                     <Image
                        src={`/products/${product.image}`}
                        alt={product.name}
                        width={60}
                        height={80}
                        priority
                     />
                  </div>

                  <div className={styles.info}>
                     <div className={styles.name}>
                        <h4>
                           {product.name.length > 50
                              ? product.name.substring(0, 45) + '...'
                              : product.name}
                        </h4>
                     </div>

                     <div className={styles.price}>
                        <span>{currency.format(product.price * product.quantity)}</span>
                        {editable ? (
                           <div className={styles.cartQuantity}>
                              <ItemCounter
                                 currentValue={product.quantity}
                                 updatedQuantity={(quantity) =>
                                    onNewCartQuantityValue(product as ICartProduct, quantity)
                                 }
                              />
                           </div>
                        ) : (
                           <h6>
                              {product.quantity} {product.quantity > 1 ? 'platos' : 'plato'}
                           </h6>
                        )}
                     </div>
                  </div>
               </div>
            </article>
         ))}
      </section>
   );
};
