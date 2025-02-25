import { FC } from 'react';
import Image from 'next/image';

import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { Slide } from 'react-slideshow-image';

import { cloudImagesPath } from '../../utils';

import 'react-slideshow-image/dist/styles.css';
import styles from './styles/FeaturedPacks.module.scss';

export const FeaturedPacks: FC = () => {
   const responsivness = [
      {
         breakpoint: 900,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
         },
      },
      {
         breakpoint: 720,
         settings: {
            slidesToShow: 2,
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

   const props = {
      prevArrow: <CiCircleChevLeft className={styles.leftArrow} />,
      nextArrow: <CiCircleChevRight className={styles.rightArrow} />,
   };

   return (
      <section className={styles.featuredPacks}>
         <div className={styles.container}>
            <div className={styles.header}>
               <h2 className={styles.title}>Packs Destacados</h2>
               <p className={styles.content}>
                  Resolvé tu menú semanal en una sola compra y recibilo a domicilio
               </p>
            </div>

            <div className={styles.sliderContainer}>
               <Slide
                  easing='ease'
                  duration={4000}
                  indicators={false}
                  responsive={responsivness}
                  {...props}>
                  <div className={styles.packImg}>
                     <Image
                        src={`${cloudImagesPath}/qgfn3wv8fdvhrunqrri3`}
                        alt={'Pack Light x7'}
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                     />
                  </div>

                  <div className={styles.packImg}>
                     <Image
                        src={`${cloudImagesPath}/qgfn3wv8fdvhrunqrri3`}
                        alt={'Pack Light x7'}
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                     />
                  </div>

                  <div className={styles.packImg}>
                     <Image
                        src={`${cloudImagesPath}/qgfn3wv8fdvhrunqrri3`}
                        alt={'Pack Light x7'}
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                     />
                  </div>

                  <div className={styles.packImg}>
                     <Image
                        src={`${cloudImagesPath}/qgfn3wv8fdvhrunqrri3`}
                        alt={'Pack Light x7'}
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                     />
                  </div>
               </Slide>
            </div>
         </div>
      </section>
   );
};
