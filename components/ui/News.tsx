import { FC, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { NewsDialog } from './';

import styles from '../../styles/News.module.css';

export const News: FC = () => {
   // const [isDialogOpen, setIsDialogOpen] = useState(false);

   return (
      <>
         <section className={styles.news}>
            <div className={styles.container}>
               <div className={styles.mobileBanner}>
                  <Image
                     src='/img/banner-news-mobile.jpg'
                     alt='Hot Sale - Viandas Hot'
                     layout='fill'
                     objectFit='cover'
                     priority={true}
                  />
               </div>
               <div className={styles.desktopBanner}>
                  <Image
                     src='/img/banner-news.jpg'
                     alt='Hot Sale - Viandas Hot'
                     layout='fill'
                     objectFit='cover'
                     priority={true}
                  />
               </div>
            </div>
         </section>

         {/* {isDialogOpen && <NewsDialog setIsDialogOpen={setIsDialogOpen} />} */}
      </>
   );
};
