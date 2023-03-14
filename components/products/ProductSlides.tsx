import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';

import { IProduct } from '../../interfaces';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/ProductSlides.module.css';
import { Button } from '../ui';

interface Props {
   products: IProduct[];
}

export const ProductSlides: FC<Props> = ({ products }) => {
   return (
      <section className={styles.ourMenu}>
         <h2 className={styles.title}>Conocé nuestros platos saludables más vendidos</h2>

         <div className={styles.container}>
            <Slide easing='ease' duration={3000} indicators>
               {products.map((product) => (
                  <Link key={product._id} href={`/plato/${product.slug}`}>
                     <div className={styles.box}>
                        <div className={styles.nextImage}>
                           <>
                              <Image
                                 src={product.image}
                                 alt={product.name}
                                 width={480}
                                 height={720}
                                 priority={true}
                              />
                              <div className={styles.btn}>
                                 <Button
                                    href={`/plato/${product.slug}`}
                                    content='Ver Plato'
                                    background='var(--primary)'
                                    border='none'
                                 />
                              </div>
                           </>
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
