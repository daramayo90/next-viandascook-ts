import { FC, useContext } from 'react';
import Image from 'next/image';

import { FaArrowDown } from 'react-icons/fa';

import { CartContext } from '../../context/cart';

import { ItemCounter } from '../products';
import { ICartProduct, IOrderItem } from '../../interfaces';

import { currency } from '../../utils';

import styles from '../../styles/CartList.module.scss';

interface Props {
   editable?: boolean;
   items?: IOrderItem[];
}

export const CartList: FC<Props> = ({ items, editable = false }) => {
   const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

   const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
      product.quantity = newQuantityValue;
      updateCartQuantity(product);

      if (product && product.quantity === 0) {
         removeCartProduct(product);
      }
   };

   const products = items ? items : cart;

   // TODO: Ordenar los productos por id
   return (
      <section className={styles.cartList}>
         {products.map((product) => (
            <div key={product._id} className={styles.container}>
               <article key={product._id} className={styles.product}>
                  <div className={styles.details}>
                     <div className={styles.nextImage}>
                        <Image
                           src={product.image}
                           alt={product.name}
                           width={320}
                           height={250}
                           priority={true}
                        />

                        {product.discountPrice !== undefined &&
                           product.discountPrice > 0 &&
                           !product.name.includes('light') &&
                           !product.name.includes('proteíco') && (
                              <div className={styles.tagImageWrapper}>
                                 <Image
                                    src='/img/15off-tag-bf.png'
                                    alt='15% off - Cyber Monday'
                                    width={750}
                                    height={900}
                                    priority={true}
                                 />
                              </div>
                           )}
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
                           {product.discountPrice ? (
                              <>
                                 <span className={styles.noPrice}>
                                    {currency.format(product.price * product.quantity)}
                                 </span>
                                 <span className={styles.discount}>
                                    {currency.format(product.discountPrice)}
                                 </span>
                              </>
                           ) : (
                              <span>{currency.format(product.price * product.quantity)}</span>
                           )}

                           {editable ? (
                              <div className={styles.cartQuantity}>
                                 <ItemCounter
                                    currentValue={product.quantity}
                                    updatedQuantity={(quantity) =>
                                       onNewCartQuantityValue(product as ICartProduct, quantity)
                                    }
                                    product={product}
                                 />
                              </div>
                           ) : (
                              <span className={styles.quantity}>
                                 {product.type?.includes('Packs')
                                    ? `${product.quantity} ${product.quantity > 1 ? 'packs' : 'pack'}`
                                    : `${product.quantity} ${
                                         product.quantity > 1 ? 'platos' : 'plato'
                                      }`}
                              </span>
                           )}
                        </div>
                     </div>
                  </div>

                  {product.productsInPack && product.productsInPack.length > 0 && (
                     <>
                        <div className={styles.arrowDown}>
                           <FaArrowDown className={styles.icon} />
                        </div>

                        <div className={styles.productsInPack}>
                           <div className={styles.container}>
                              <h3 className={styles.title}>Platos del pack</h3>
                              {product.productsInPack.map((p) => (
                                 <article key={p.product._id} className={styles.product}>
                                    <span className={`${styles.name} ${styles.mobile}`}>
                                       {p.product.name.length > 35
                                          ? p.product.name.substring(0, 35) + '...'
                                          : p.product.name}
                                    </span>
                                    <span className={`${styles.name} ${styles.tablet}`}>
                                       {p.product.name.length > 45
                                          ? p.product.name.substring(0, 45) + '...'
                                          : p.product.name}
                                    </span>
                                    <span className={styles.quantity}>x{p.quantity}</span>
                                 </article>
                              ))}
                           </div>
                        </div>
                     </>
                  )}
               </article>
            </div>
         ))}
      </section>
   );
};
