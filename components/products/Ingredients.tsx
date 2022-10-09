import { FC } from 'react';

import { IProduct } from '../../interfaces';

import styles from '../../styles/Product.module.css';

interface Props {
   product: IProduct;
}

export const Ingredients: FC<Props> = ({ product }) => {
   return (
      <div className={styles.ingredients}>
         <h3 className={styles.subTitle}>Ingredientes</h3>

         <div className={styles.container}>
            {product.ingredients.map((ingredient, index) => (
               <div key={index} className={styles.ingredient}>
                  <span>{ingredient}</span>
               </div>
            ))}
         </div>
      </div>
   );
};
