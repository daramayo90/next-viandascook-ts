import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';

import { discounts } from '../../utils';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

import 'react-slideshow-image/dist/styles.css';
import styles from './styles/Promos.module.scss';

export const Promos: FC = () => {
   const responsivness = [
      {
         breakpoint: 640,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 0,
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

   const props = {
      prevArrow: <CiCircleChevLeft className={styles.leftArrow} />,
      nextArrow: <CiCircleChevRight className={styles.rightArrow} />,
   };

   return (
      <div className={styles.promos}>
         <div className={styles.header}>
            <h2 className={styles.title}>Promociones</h2>
            <p className={styles.content}>Aprovechá nuestras increíbles ofertas:</p>
         </div>

         <div className={styles.container}>
            <Slide
               easing='ease'
               duration={4000}
               indicators={false}
               responsive={responsivness}
               {...props}>
               {discounts.map(({ name, img }) => (
                  <div key={name} className={styles.discount}>
                     <Link href='/descuentos'>
                        <Image
                           src={img}
                           alt={name}
                           layout='fill'
                           objectFit='cover'
                           sizes='(max-width: 768px) 60vw, (min-width: 720px) 40vw'
                        />
                     </Link>
                  </div>
               ))}
            </Slide>
         </div>
      </div>
   );
};
