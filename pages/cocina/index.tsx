import { NextPage } from 'next';
import Link from 'next/link';

import { ViandasLayout } from '../../components/layouts';

import styles from '../../styles/AdminLayout.module.css';

const CocinaPage: NextPage = () => {
   return (
      <ViandasLayout title={'Cocina Viandas Cook'}>
         <section className={styles.viandas}>
            <Link href='/cocina/preparar-platos'>
               <button className={styles.linkToBtn}>Preparar platos</button>
            </Link>

            <Link href='/cocina/preparar-pedidos'>
               <button className={styles.linkToBtn}>Preparar pedidos</button>
            </Link>
         </section>
      </ViandasLayout>
   );
};

export default CocinaPage;
