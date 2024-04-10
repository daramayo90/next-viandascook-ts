import { FC, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Image from 'next/image';

import styles from '../../styles/News.module.css';

export const News: FC = () => {
   // const [isDialogOpen, setIsDialogOpen] = useState(false);
   const router = useRouter();

   const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      await router.push('/menu?type=Waffles');
      window.location.hash = 'menu-products';
   };

   return (
      <>
         <a href='#menu-products' onClick={handleClick}>
            <section className={styles.news}>
               <div className={styles.container}>
                  <div className={styles.mobileBanner}>
                     <Image
                        src='/img/banner-news-waffles-mobile.jpg'
                        alt='Promo 20% off - Lanzamiento Waffles'
                        layout='fill'
                        objectFit='cover'
                        // priority={true}
                     />
                  </div>
                  <div className={styles.desktopBanner}>
                     <Image
                        src='/img/banner-news-waffles.jpg'
                        alt='Promo 10% off - Lanzamiento Waffles'
                        layout='fill'
                        objectFit='cover'
                        // priority={true}
                     />
                  </div>
               </div>
            </section>
         </a>

         {/* {isDialogOpen && <NewsDialog setIsDialogOpen={setIsDialogOpen} />} */}
      </>
   );
};
