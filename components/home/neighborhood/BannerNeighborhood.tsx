import { FC } from 'react';
import Image from 'next/image';

import { cloudImagesPath } from '../../../utils';
import { useIsMobile } from '../../../hooks';

import styles from '../styles/Banner.module.scss';

interface Props {
   neighborhood: string;
}

export const BannerNeighborhood: FC<Props> = ({ neighborhood }) => {
   const isMobile = useIsMobile(600);

   const banner1 = isMobile
      ? `${cloudImagesPath}/Banners/d5p7bomhr22eu8vz0y8f`
      : `${cloudImagesPath}/Banners/q12ht5mhfnpt7pa9ens4`;

   const banner2 = isMobile
      ? `${cloudImagesPath}/Banners/xkf0yfoewjkukd9zl5vx`
      : `${cloudImagesPath}/Banners/tcflysfdphdgstdqwrxl`;

   return (
      <section className={styles.banner}>
         <div className={styles.header}>
            <h1 className={styles.title}>Viandas Saludables en {neighborhood}</h1>
            <p className={styles.slogan}>¡Que tus días tengan sabor!</p>
         </div>
         <div className={styles.images}>
            <Image
               src={banner1}
               alt='Viandas Cook - Banner'
               layout='fill'
               objectFit='cover'
               priority
            />
            <Image
               src={banner2}
               alt='Viandas Cook - Banner'
               layout='fill'
               objectFit='cover'
               priority
            />
         </div>

         <div className={styles.info}>
            <p className={styles.content}>
               Disfrutá de nuestras comidas frescas, caseras y entregadas a domicilio en CABA y GBA
            </p>
         </div>
      </section>
   );
};
