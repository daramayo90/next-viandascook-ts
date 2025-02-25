import { FC } from 'react';
import Image from 'next/image';

import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { Slide } from 'react-slideshow-image';

import { cloudImagesPath } from '../../utils';

import 'react-slideshow-image/dist/styles.css';
import styles from './styles/FeaturedPacks.module.scss';
import Link from 'next/link';

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
                     <Link href='/packs'>
                        <Image
                           src={`${cloudImagesPath}/qsxwv8wjdsoi2i4pvaxs`}
                           alt={'Pack Light x7'}
                           layout='fill'
                           objectFit='cover'
                           priority={true}
                        />
                     </Link>
                  </div>

                  <div className={styles.packImg}>
                     <Link href='/packs'>
                        <Image
                           src={`${cloudImagesPath}/ecvzrp1vpcyow7xb3pzq`}
                           alt={'Pack Light x14'}
                           layout='fill'
                           objectFit='cover'
                           priority={true}
                        />
                     </Link>
                  </div>

                  <div className={styles.packImg}>
                     <Link href='/packs'>
                        <Image
                           src={`${cloudImagesPath}/rtn3xctaxp0o2ok80c7b`}
                           alt={'Pack Proteíco x14'}
                           layout='fill'
                           objectFit='cover'
                           priority={true}
                        />
                     </Link>
                  </div>

                  <div className={styles.packImg}>
                     <Link href='/packs'>
                        <Image
                           src={`${cloudImagesPath}/udjn8lblvjgz7vg6ulcp`}
                           alt={'Pack Proteíco x21'}
                           layout='fill'
                           objectFit='cover'
                           priority={true}
                        />
                     </Link>
                  </div>
               </Slide>
            </div>
         </div>
      </section>
   );
};
