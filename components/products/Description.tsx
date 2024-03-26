import { FC } from 'react';
import { IProduct } from '../../interfaces';
import styles from '../../styles/Product.module.css';

interface Props {
   product: IProduct;
}

export const Description: FC<Props> = ({ product }) => {
   return (
      <div className={styles.description}>
         <p>{product.description}</p>
      </div>
   );
};
