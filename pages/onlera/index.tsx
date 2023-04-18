import { NextPage } from 'next';
import Link from 'next/link';

import { ViandasLayout } from '../../components/layouts';

import styles from '../../styles/AdminLayout.module.css';

const OnleraPage: NextPage = () => {
   return (
      <ViandasLayout title={'Onlera Viandas Cook'}>
         <section className={styles.viandas}>
            <Link href='/onlera/orders'>
               <button className={styles.linkToBtn}>Pedidos Recibidos</button>
            </Link>
         </section>
      </ViandasLayout>
   );
};

export default OnleraPage;
