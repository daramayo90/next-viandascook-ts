import Image from 'next/image';

import { Button } from './Button';
import { cloudImagesPath } from '../../utils';

import styles from '../../styles/Banner.module.css';
import { FC } from 'react';

interface Props {
   neighborhood: string;
}

export const BannerNeighborhood: FC<Props> = ({ neighborhood }) => {
   return (
      <section className={styles.banner}>
         <Image
            src={`${cloudImagesPath}/l7pxb4l3eftmhwrgqq4l.jpg`}
            // src='/img/navidad-banner-viandascook.jpg'
            alt='Viandas Cook - Banner'
            layout='fill'
            objectFit='cover'
            priority
         />

         <div className={styles.overlay}></div>

         <div className={styles.container}>
            <div className={styles.brand}>
               <h1 className={styles.title} style={{ textTransform: 'initial' }}>
                  Comida Deliciosa y Saludable en {neighborhood}
               </h1>
               <p className={styles.slogan}>
                  <span>Hace que tu dia</span>
                  <span> tenga sabor!</span>
               </p>

               <div className={styles.button}>
                  <Button href='/menu' content='¡Quiero!' color='white' border='2px white solid' />
               </div>
            </div>

            <div className={styles.bannerDishes}>
               <div className={styles.nextImage}>
                  <Image
                     src={`${cloudImagesPath}/l4oxi04a73ols8locaxw.png`}
                     alt='viandascook-banner-back'
                     priority={true}
                     quality={80}
                     layout='fill'
                     sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw'
                  />
               </div>
            </div>
         </div>
      </section>
   );
};
