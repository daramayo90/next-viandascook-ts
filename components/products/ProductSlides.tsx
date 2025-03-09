import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

import { IProduct } from '../../interfaces';

import 'react-slideshow-image/dist/styles.css';
import styles from './styles/ProductSlides.module.scss';
import { Button } from '../ui';

interface Props {
   products: IProduct[];
   title?: string;
}

export const ProductSlides: FC<Props> = ({ products, title }) => {
   const responsiveSettings = [
      {
         breakpoint: 999,
         settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
         },
      },
      {
         breakpoint: 720,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
         },
      },
      {
         breakpoint: 500,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ];

   const properties = {
      prevArrow: <CiCircleChevLeft className={styles.leftArrow} />,
      nextArrow: <CiCircleChevRight className={styles.rightArrow} />,
   };

   return (
      <section className={styles.ourMenu}>
         {title ? (
            <h2 className={styles.title}>{title}</h2>
         ) : (
            <>
               <h2 className={styles.title}>Viandas Destacadas</h2>
               <p className={styles.subTitle}>Conocé nuestros platos saludables más vendidos</p>
            </>
         )}

         <div className={styles.container}>
            <Slide easing='ease' duration={4000} responsive={responsiveSettings} {...properties}>
               {products.map((product) => (
                  <Link key={product._id} href={`/plato/${product.slug}`}>
                     <div className={styles.product}>
                        <div className={styles.productImg}>
                           <Image
                              src={product.image}
                              alt={product.name}
                              width={480}
                              height={720}
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                              onError={(e) => console.log('Error loading image:', e)}
                           />
                        </div>
                        <h3 className={styles.productName}>{product.name}</h3>
                     </div>
                  </Link>
               ))}
            </Slide>
         </div>

         <div className={styles.btn}>
            <Button
               href={'/menu'}
               content={'Descubrí Más Platos'}
               background='var(--secondaryLight)'
               color='white'
            />
         </div>
      </section>
   );
};
