import { FC, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { NewsDialog } from './';

import styles from '../../styles/News.module.css';

export const News: FC = () => {
   // const [isDialogOpen, setIsDialogOpen] = useState(false);

   return (
      <>
         <Link href='/plato/wrap-de-vegetales-con-arroz-primavera'>
            <section className={styles.news}>
               <div className={styles.container}>
                  <div className={styles.mobileBanner}>
                     <Image
                        src='/img/banner-news-mobile.jpg'
                        alt='Wrap de vegetales con arroz primavera - Promo lanzamiento'
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                     />
                  </div>
                  <div className={styles.desktopBanner}>
                     <Image
                        src='/img/banner-news.jpg'
                        alt='Wrap de vegetales con arroz primavera - Promo lanzamiento'
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                     />
                  </div>
               </div>
            </section>
         </Link>

         {/* {isDialogOpen && <NewsDialog setIsDialogOpen={setIsDialogOpen} />} */}
      </>
   );
};
