import { NextPage } from 'next';
import Link from 'next/link';

import { KitchenLayout } from '../../../components/layouts';

import styles from '../../styles/AdminLayout.module.css';

const CocinaPage: NextPage = () => {
   return (
      <KitchenLayout title={'Cocina Viandas Cook'}>
         <section className={styles.kitchen}>
            <Link href='/cocina/preparar-platos'>
               <button className={styles.linkToBtn}>Preparar platos</button>
            </Link>

            <Link href='/cocina/preparar-pedidos'>
               <button className={styles.linkToBtn}>Preparar pedidos</button>
            </Link>
         </section>
      </KitchenLayout>
   );
};

export default CocinaPage;
