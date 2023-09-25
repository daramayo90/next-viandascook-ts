import type { NextPage } from 'next';
import Image from 'next/image';

import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/Discounts.module.css';

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
   // {
   //    name: 'Descuento Cyber Monday',
   //    img: '/discounts/offer-cyber-monday.png',
   // },
   // {
   //    name: 'Descuento Black Friday',
   //    img: '/discounts/offer-black-friday.png',
   // },
];

const DiscountsPage: NextPage = () => {
   return (
      <ShopLayout title={'Viandas Cook - Descuentos'} pageDescription={''}>
         <section className={styles.discounts}>
            {discounts.map(({ name, img }) => (
               <div key={name} className={styles.nextImage}>
                  <Image src={img} alt={name} width={420} height={220} priority={true} />
               </div>
            ))}
         </section>
      </ShopLayout>
   );
};

export default DiscountsPage;
