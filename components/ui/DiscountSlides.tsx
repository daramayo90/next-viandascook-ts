import Image from 'next/image';
import Link from 'next/link';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/DiscountSlides.module.css';

const discounts = [
   {
      name: 'discount 1',
      img: '/offers/discount-1.jpg',
   },
   {
      name: 'discount 2',
      img: '/offers/discount-2.jpg',
   },
   {
      name: 'discount 3',
      img: '/offers/discount-3.jpg',
   },
   {
      name: 'discount 4',
      img: '/offers/discount-4.jpg',
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

         <Slide easing='ease' duration={4000} indicators>
            {discounts.map(({ name, img }) => (
               <div key={name} className={styles.nextImage}>
                  <Image src={img} alt={name} width={300} height={150} />
               </div>
            ))}
         </Slide>
      </div>
   );
};
