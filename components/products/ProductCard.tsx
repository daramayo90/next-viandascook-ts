import { FC } from 'react';
import Link from 'next/link';

import { IProduct } from '../../interfaces';

import { ItemCounter } from './';
import { currency } from '../../utils';

import styles from '../../styles/Products.module.css';

interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   return (
      <article className={styles.product}>
         <Link href={`/product/${product.name}`} prefetch={false}>
            <article className={styles.card}>
               {product.inStock === false && <div className={styles.stock}>Sin stock</div>}

               <img src={`/products/${product.image}`} alt={product.name} />

               <div className={styles.tags}>
                  <div className={styles.tag}>
                     {/* TODO: Ver el tipo 'any' */}
                     {Object.values(product.nutritionalInfo).map((p: any) => (
                        <span key={product._id}>{p.calories}</span>
                     ))}
                  </div>
               </div>
            </article>
         </Link>

         <article className={`${styles.box} fadeIn`}>
            <h4 className={styles.name}>{product.name}</h4>
            <div className={styles.container}>
               <h4 className={styles.price}>{currency.format(product.price)}</h4>
               <ItemCounter />
            </div>
         </article>
      </article>
   );
};
