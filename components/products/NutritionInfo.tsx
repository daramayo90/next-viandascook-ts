import { FC } from 'react';

import { IProduct } from '../../interfaces';

import styles from '../../styles/products/Product.module.scss';

interface Props {
   product: IProduct;
}

export const NutritionInfo: FC<Props> = ({ product }) => {
   return (
      <div className={styles.nutrition}>
         <h3 className={styles.subTitle}>Información Nutricional</h3>

         {Object.entries(product.nutritionalInfo).map((nutrition, index) => (
            <div key={index} className={styles.nutritionInfo}>
               <span>{nutrition[0]}</span>
               <span>{nutrition[1]}</span>
            </div>
         ))}
      </div>
   );
};
