import { FC } from 'react';

import styles from '../../styles/News.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const News: FC = () => {
   return (
      <section className={styles.news}>
         <Link href='/plato/tarta-integral-de-calabaza-y-queso'>
            <div className={styles.container}>
               <div className={styles.mobileBanner}>
                  <Image
                     src='/img/banner-lanzamiento-tarta-calabaza-queso-mobile.jpg'
                     alt='Tarta de calabaza y queso'
                     layout='fill'
                     objectFit='cover'
                     priority={true}
                  />
               </div>
               <div className={styles.desktopBanner}>
                  <Image
                     src='/img/banner-lanzamiento-tarta-calabaza-queso.jpg'
                     alt='Tarta de calabaza y queso'
                     layout='fill'
                     objectFit='cover'
                     priority={true}
                  />
               </div>
            </div>
         </Link>
      </section>
   );
};
