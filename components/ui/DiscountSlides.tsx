import Image from 'next/image';
import Link from 'next/link';

import { Fade } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/DiscountSlides.module.css';

const discounts = [
   // {
   //    name: 'Viandas Hot - Hot Sale 20%',
   //    img: '/discounts/offer-hot-sale.png',
   // },
   // {
   //    name: 'Día del padre - 10%',
   //    img: '/discounts/offer-dad-day.png',
   // },
   // {
   //    name: 'Promo día del amigo',
   //    img: '/discounts/promo-dia-del-amigo.png',
   // },
   // {
   //    name: 'Promo finde xl',
   //    img: '/discounts/promo-findexl.png',
   // },
   // {
   //    name: 'Promo primavera',
   //    img: '/discounts/promo-primavera.png',
   // },
   // {
   //    name: 'Promo día de la madre',
   //    img: '/discounts/promo-dia-de-la-madre.png',
   // },
   // {
   //    name: 'Descuento Cyber Monday',
   //    img: '/discounts/offer-cyber-monday.png',
   // },
   // {
   //    name: 'Descuento Black Friday',
   //    img: '/discounts/offer-black-friday.png',
   // },
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
];

export const DiscountSlides = () => {
   return (
      <div className={styles.offers}>
         <div className={styles.container}>
            <p className={styles.title}>Descuentos especiales</p>

            <Link href='/descuentos'>
               <span>Ver todos</span>
            </Link>
         </div>

         <Fade easing='ease' duration={4000} indicators>
            {discounts.map(({ name, img }) => (
               <div key={name} className={styles.nextImage}>
                  <Image
                     src={img}
                     alt={name}
                     layout='fill'
                     objectFit='cover'
                     sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
               </div>
            ))}
         </Fade>
      </div>
   );
};
