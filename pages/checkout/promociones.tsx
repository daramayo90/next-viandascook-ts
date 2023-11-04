import { NextPage } from 'next/types';

import { ShopLayout } from '../../components/layouts';
import { PromosList } from '../../components/checkout';

import styles from '../../styles/Promos.module.css';

const PromosPage: NextPage = () => {
   return (
      <ShopLayout title={'Promociones | Viandas Cook'} pageDescription={''} noIndex>
         <section className={styles.promos}>
            <PromosList />
         </section>
      </ShopLayout>
   );
};

export default PromosPage;
