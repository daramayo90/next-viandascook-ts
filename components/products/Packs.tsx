import { FC } from 'react';
import Image from 'next/image';

import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { Slide } from 'react-slideshow-image';

import { cloudIcons, cloudImagesPath } from '../../utils';

import 'react-slideshow-image/dist/styles.css';
import styles from './styles/Packs.module.scss';
import { Category } from './Category';

export const Packs: FC = () => {
   const responsivness = [
      {
         breakpoint: 900,
         settings: {
            slidesToShow: 4,
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

   const props = {
      prevArrow: <CiCircleChevLeft className={styles.leftArrow} />,
      nextArrow: <CiCircleChevRight className={styles.rightArrow} />,
      indicators: false,
      autoplay: false, // <- Disable autoplay
      infinite: true, // <- Enable looping
      duration: 0,
      transitionDuration: 500, // Controls the slide transition speed if you do click next/prev
      responsive: responsivness,
   };

   return (
      <section className={styles.packs}>
         <div className={styles.container}>
            <div className={styles.header}>
               <h2 className={styles.title}>¡Conocé los Packs!</h2>
               <p className={styles.content}>
                  Resolvé tu menú semanal o mensual en una sola compra y recibilo a domicilio
               </p>
            </div>

            <div className={styles.sliderContainer}>
               <Slide easing='ease' {...props}>
                  <Category
                     href='/packs?viandas=7'
                     src={`${cloudIcons}/uctdy93jmagxsalssu2r`}
                     content='Pack 7 Viandas'
                  />

                  <Category
                     href='/packs?viandas=14'
                     src={`${cloudIcons}/uctdy93jmagxsalssu2r`}
                     content='Pack 14 Viandas'
                  />

                  <Category
                     href='/packs?viandas=21'
                     src={`${cloudIcons}/uctdy93jmagxsalssu2r`}
                     content='Pack 21 Viandas'
                  />

                  <Category
                     href='/packs?viandas=28'
                     src={`${cloudIcons}/uctdy93jmagxsalssu2r`}
                     content='Pack 28 Viandas'
                  />
               </Slide>
            </div>
         </div>
      </section>
   );
};
