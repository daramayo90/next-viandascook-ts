import { NextPage } from 'next/types';

import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/Promos.module.css';

const PromosPage: NextPage = () => {
   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.promos}>
            <div></div>
         </section>
      </ShopLayout>
   );
};

export default PromosPage;
