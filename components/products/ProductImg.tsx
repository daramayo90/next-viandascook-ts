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
               src={product.image}
               alt={product.name}
               width={800}
               height={800}
               layout='responsive'
               priority
            />

            <div className={styles.tagImageWrapper}>
               <Image
                  src='/img/10off-tag.png'
                  alt='Finde XL - Promo'
                  width={750}
                  height={900}
                  priority={true}
               />
            </div>
         </div>
      </div>
   );
};
