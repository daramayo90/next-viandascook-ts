import { FC } from 'react';
import Image from 'next/image';

import { IProduct } from '../../interfaces';

import styles from '../../styles/Product.module.css';

interface Props {
   product: IProduct;
}

export const ProductImg: FC<Props> = ({ product }) => {
   return (
      <div className={styles.image}>
         <div className={styles.nextImage}>
            <Image
               src={`/products/${product.image}`}
               alt={product.name}
               width={800}
               height={800}
               layout='responsive'
               priority
            />
         </div>
      </div>
   );
};
