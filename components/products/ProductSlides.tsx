import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';

import { IProduct } from '../../interfaces';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/ProductSlides.module.css';

interface Props {
   products: IProduct[];
}

export const ProductSlides: FC<Props> = ({ products }) => {
   return (
      <section className={styles.ourMenu}>
         <h2 className={styles.title}>Conocé Nuestras Viandas Saludables</h2>

         <div className={styles.container}>
            <Slide easing='ease' duration={4000} indicators>
               {products.map((product) => (
                  <Link key={product._id} href={`/plato/${product.slug}`}>
                     <div className={styles.box}>
                        <div className={styles.nextImage}>
                           <Image
                              src={`/products/${product.image}`}
                              alt={product.name}
                              width={400}
                              height={400}
                           />
                        </div>
                        <h5 className={styles.title}>{product.name}</h5>
                     </div>
                  </Link>
               ))}
            </Slide>
         </div>
      </section>
   );
};
