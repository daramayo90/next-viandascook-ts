import { FC } from 'react';
import NImage from 'next/image';

import { IProduct } from '../../interfaces';

import styles from '../../styles/Product.module.css';

interface Props {
   product: IProduct;
}

export const Image: FC<Props> = ({ product }) => {
   return (
      <div className={styles.image}>
         <div className={styles.nextImage}>
            <NImage
               src={`/products/${product.image}`}
               alt={product.name}
               width={100}
               height={100}
               layout='responsive'
               priority
            />
         </div>
      </div>
   );
};
