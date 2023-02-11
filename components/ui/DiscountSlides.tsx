import Image from 'next/image';
import Link from 'next/link';

import { Fade } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/DiscountSlides.module.css';

const discounts = [
   {
      name: 'Descuento llevando 14 viandas o más',
      img: '/discounts/offer-14-viandas.png',
   },
   {
      name: 'Descuento llevando 28 viandas o más',
      img: '/discounts/offer-28-viandas.png',
   },
   {
      name: 'Descuento llevando 56 viandas o más',
      img: '/discounts/offer-56-viandas.png',
   },
   {
      name: 'Descuento Cyber Monday',
      img: '/discounts/offer-cyber-monday.png',
   },
   {
      name: 'Descuento Black Friday',
      img: '/discounts/offer-black-friday.png',
   },
];

export const DiscountSlides = () => {
   return (
      <div className={styles.offers}>
         <div className={styles.container}>
            <h3 className={styles.title}>Descuentos especiales</h3>

            <Link href='/descuentos'>
               <span>Ver todos</span>
            </Link>
         </div>

         <Fade easing='ease' duration={3000} indicators>
            {discounts.map(({ name, img }) => (
               <div key={name} className={styles.nextImage}>
                  <Image src={img} alt={name} width={600} height={300} priority={true} />
               </div>
            ))}
         </Fade>
      </div>
   );
};
