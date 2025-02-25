import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Slide } from 'react-slideshow-image';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

import { cloudIcons } from '../../utils';

import styles from './styles/Categories.module.scss';
import 'react-slideshow-image/dist/styles.css';
import { Category } from '../products';

export const Categories: FC = () => {
   const responsivness = [
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
      <section className={styles.categories}>
         <div className={styles.container}>
            <Slide easing='ease' {...props}>
               <Category
                  href='/menu'
                  src={`${cloudIcons}/w6dlieuzt3dr7mronskw`}
                  content='Elegí tus viandas por unidad'
               />

               <Category
                  href='/packs?viandas=7'
                  src={`${cloudIcons}/h0uvijubvyu1pfxcnarj`}
                  content='Pack 7 Viandas'
               />

               <Category
                  href='/packs?viandas=14'
                  src={`${cloudIcons}/h0uvijubvyu1pfxcnarj`}
                  content='Pack 14 Viandas'
               />

               <Category
                  href='/packs?viandas=21'
                  src={`${cloudIcons}/h0uvijubvyu1pfxcnarj`}
                  content='Pack 21 Viandas'
               />

               <Category
                  href='/packs?viandas=28'
                  src={`${cloudIcons}/h0uvijubvyu1pfxcnarj`}
                  content='Pack 28 Viandas'
               />
            </Slide>
         </div>
      </section>
   );
};
