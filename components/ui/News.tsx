import { FC } from 'react';

import Image from 'next/image';

import styles from '../../styles/News.module.css';

export const News: FC = () => {
   // const [isDialogOpen, setIsDialogOpen] = useState(false);

   return (
      <>
         {/* <Link href='/plato/tarta-integral-de-atun'> */}
         <section className={styles.news}>
            <div className={styles.container}>
               <div className={styles.mobileBanner}>
                  <Image
                     src='/img/banner-news-mobile.jpg'
                     alt='Promo 10% off - Viandas Cook'
                     layout='fill'
                     objectFit='cover'
                     // priority={true}
                  />
               </div>
               <div className={styles.desktopBanner}>
                  <Image
                     src='/img/banner-news.jpg'
                     alt='Promo 10% off - Viandas Cook'
                     layout='fill'
                     objectFit='cover'
                     // priority={true}
                  />
               </div>
            </div>
         </section>
         {/* </Link> */}

         {/* {isDialogOpen && <NewsDialog setIsDialogOpen={setIsDialogOpen} />} */}
      </>
   );
};
