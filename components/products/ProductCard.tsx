import { FC, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { CartContext } from '../../context';
import { ICartProduct, IProduct } from '../../interfaces';

import { ItemCounter } from './';
import { currency } from '../../utils';

import styles from '../../styles/Products.module.css';

interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   const { cart, addProductToCart, updateCartQuantity, removeCartProduct } =
      useContext(CartContext);

   const [isSelecting, setIsSelecting] = useState(false);

   // TODO: Ver por qué no funciona el 'setTempCartProduct'
   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      image: product.image,
      name: product.name,
      slug: product.slug,
      price: product.price,
      type: product.type,
      quantity: 0,
   });

   // Add new product to cart, else update product cart quantity
   const onNewCartQuantityValue = (product: ICartProduct, quantity: number) => {
      if (!product) {
         tempCartProduct.quantity = quantity;
         addProductToCart(tempCartProduct);
      } else {
         product.quantity = quantity;
         updateCartQuantity(product);
      }

      if (product && product.quantity === 0) {
         removeCartProduct(product);
      }
   };

   useEffect(() => {
      const interval = setInterval(() => setIsSelecting(false), 3500);

      return () => clearInterval(interval);
   }, [cart]);

   // TODO: Ver el tema any
   const info: any = product.nutritionalInfo;
   const cartProduct = cart.find((p) => product._id === p._id);

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

               {/* TODO: Out of Stock */}
               {/* <button className={styles.addToCart} onClick={onAddProduct}>
                  Agregar al carrito
               </button> */}
            </div>
         </article>
      </article>
   );
};
