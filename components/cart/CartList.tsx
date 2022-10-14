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
            <div key={product._id} className={styles.product}>
               <div className={styles.details}>
                  <div className={styles.nextImage}>
                     <Image src={`/products/${product.image}`} width={60} height={60} />
                  </div>
                  <div className={styles.info}>
                     <span className={styles.name}>{product.name}</span>
                     <span className={styles.price}>{currency.format(product.price)}</span>
                  </div>
               </div>

               {editable ? (
                  <ItemCounter
                     currentValue={product.quantity}
                     updatedQuantity={(quantity) =>
                        onNewCartQuantityValue(product as ICartProduct, quantity)
                     }
                  />
               ) : (
                  <h6>
                     {product.quantity} {product.quantity > 1 ? 'platos' : 'plato'}
                  </h6>
               )}
            </div>
         ))}
         {/* <IoMdCloseCircleOutline
                        className={styles.remove}
                        onClick={() => onRemoveProduct(product as ICartProduct)}
                     /> */}
      </section>
   );
};
