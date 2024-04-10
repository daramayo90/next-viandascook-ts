import type { NextPage } from 'next';
import Image from 'next/image';

import { ShopLayout } from '../../components/layouts';

import { seo } from '../../utils';

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
      name: 'Promo 20% - Lanzamiento waffles',
      img: '/discounts/promo-waffles.png',
   },
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

const DiscountsPage: NextPage = () => {
   const { title, description, keywords, canonical } = seo['DiscountsPage'];

   return (
      <ShopLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.discounts}>
            <p className={styles.text}>
               Descubrí descuentos irresistibles del <strong>10%, 15% y más</strong>. Además, disfruta
               de <strong>envío gratis</strong> al pedir más de 14 viandas.
            </p>
            <p className={styles.text}>
               Hacé tu pedido hoy y deleitá tu paladar con nuestras deliciosas propuestas a precios aún
               más tentadores.
            </p>
            <p className={styles.text}>
               ¡Sabor y beneficios que sólo <strong>Viandas Cook</strong> puede brindarte!
            </p>
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
