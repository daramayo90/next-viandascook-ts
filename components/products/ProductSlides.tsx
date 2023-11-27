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
   const responsiveSettings = [
      {
         breakpoint: 1100,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
      {
         breakpoint: 720,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
         },
      },
   ];

   return (
      <section className={styles.ourMenu}>
         <h2 className={styles.title}>Conocé nuestros platos saludables más vendidos</h2>

         <div className={styles.container}>
            <Slide easing='ease' duration={3000} indicators={true} responsive={responsiveSettings}>
               {products.map((product) => (
                  <Link key={product._id} href={`/plato/${product.slug}`}>
                     <div className={styles.box}>
                        <div className={styles.nextImage}>
                           <div>
                              <Image
                                 src={product.image}
                                 alt={product.name}
                                 width={480}
                                 height={720}
                                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                 onError={(e) => console.log('Error loading image:', e)}
                              />
                              <div className={styles.btn}>
                                 <Button
                                    href={`/plato/${product.slug}`}
                                    content='Ver Plato'
                                    background='var(--primary)'
                                    border='none'
                                 />
                              </div>
                           </div>
                        </div>
                        <h3 className={styles.title}>{product.name}</h3>
                     </div>
                  </Link>
               ))}
            </Slide>
         </div>
      </section>
   );
};
