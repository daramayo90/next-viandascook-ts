import type { NextPage } from 'next';
import Image from 'next/image';

import { ShopLayout } from '../../components/layouts';
import { discounts, seo } from '../../utils';

import styles from '../../styles/Discounts.module.css';

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
