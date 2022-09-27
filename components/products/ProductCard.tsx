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
   const { cart, addProductToCart } = useContext(CartContext);

   const [selected, setSelected] = useState(false);
   const [selectMore, setSelectMore] = useState(true);

   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      image: product.image,
      name: product.name,
      slug: product.slug,
      price: product.price,
      type: product.type,
      quantity: 0,
   });

   const onUpdatedQuantity = (quantity: number) => {
      setTempCartProduct((currentProduct) => ({
         ...currentProduct,
         quantity,
      }));
   };

   const onAddProduct = () => {
      if (tempCartProduct.quantity === 0 || !selectMore) return;

      addProductToCart(tempCartProduct);

      setSelectMore(false);
   };

   useEffect(() => {
      if (cartProduct) {
         setSelected(true);
         setSelectMore(false);
      } else {
         setSelected(false);
      }
   }, [cart]);

   useEffect(() => {
      setTempCartProduct((currentProduct) => ({
         ...currentProduct,
         quantity: cartProduct ? cartProduct.quantity : 0,
      }));
   }, [cart]);

   // TODO: Ver el tema any
   const info: any = product.nutritionalInfo;
   const cartProduct = cart.find((p) => product._id === p._id);

   return (
      <article className={selected ? `${styles.product} selected` : `${styles.product}`}>
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

               {!cartProduct || selectMore ? (
                  <ItemCounter
                     currentValue={tempCartProduct.quantity}
                     updatedQuantity={onUpdatedQuantity}
                  />
               ) : (
                  <div className={styles.selectedQuantity} onClick={() => setSelectMore(true)}>
                     <span>{cartProduct.quantity}</span>
                  </div>
               )}

               {/* TODO: Out of Stock */}
               <button className={styles.addToCart} onClick={onAddProduct}>
                  Agregar al carrito
               </button>
            </div>
         </article>
      </article>
   );
};
