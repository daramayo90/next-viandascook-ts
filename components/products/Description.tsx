import { FC } from 'react';
import { IProduct } from '../../interfaces';
import styles from '../../styles/products/Product.module.scss';

interface Props {
   product: IProduct;
}

export const Description: FC<Props> = ({ product }) => {
   return (
      <div className={styles.description}>
         <p>{product.description}</p>
         {product.name.includes('Waffle') && (
            <p className={styles.waffles}>
               <strong>¡No te olvides de agregar tu topping favorito!</strong>
            </p>
         )}
      </div>
   );
};
