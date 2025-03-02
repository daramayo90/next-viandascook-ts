import type { NextPage } from 'next';
import Image from 'next/image';

import { MainLayout } from '../../components/layouts';
import { discounts, seo } from '../../utils';

import styles from './Discounts.module.scss';

const DiscountsPage: NextPage = () => {
   const { title, description, keywords, canonical } = seo['DiscountsPage'];

   return (
      <MainLayout
         title={title}
         pageDescription={description}
         keywords={keywords}
         can={canonical}
         index>
         <section className={styles.discounts}>
            <div className={styles.container}>
               <h1 className={styles.title}>Conocé nuestras promociones</h1>
               <p className={styles.text}>
                  Descubrí descuentos irresistibles del <strong>10%, 15% y más</strong>.
               </p>
               <p className={styles.text}>
                  Hacé tu pedido hoy y deleitá tu paladar con nuestras deliciosas propuestas a precios
                  aún más tentadores.
               </p>
               <p className={styles.text}>
                  ¡Sabor y beneficios que sólo <strong>Viandas Cook</strong> puede brindarte!
               </p>
               {discounts.map(({ name, img }) => (
                  <div key={name} className={styles.nextImage}>
                     <Image src={img} alt={name} width={420} height={220} priority={true} />
                  </div>
               ))}
            </div>
         </section>
      </MainLayout>
   );
};

export default DiscountsPage;
