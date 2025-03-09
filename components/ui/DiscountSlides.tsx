import Image from 'next/image';
import Link from 'next/link';

import { Fade } from 'react-slideshow-image';
import { discounts } from '../../utils';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/DiscountSlides.module.css';

export const DiscountSlides = () => {
   return (
      <div className={styles.offers}>
         <div className={styles.container}>
            <h2 className={styles.title}>Descuentos especiales</h2>

            <Link href='/descuentos'>
               <span>Ver todos</span>
            </Link>
         </div>

         <Fade easing='ease' duration={4000} indicators cssClass={styles.slide}>
            {discounts.map(({ name, img }) => (
               <div key={name} className={styles.nextImage}>
                  <Image
                     src={img}
                     alt={name}
                     layout='fill'
                     objectFit='cover'
                     sizes='(max-width: 768px) 60vw, (min-width: 720px) 40vw'
                  />
               </div>
            ))}
         </Fade>
      </div>
   );
};
