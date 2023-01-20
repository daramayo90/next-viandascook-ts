import { useState, useEffect } from 'react';

import useSWR from 'swr';

import { DashboardSummaryResponse } from '../../interfaces';

import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin/SummaryTile';

import { MdOutlineDashboard } from 'react-icons/md';

import styles from '../../styles/Dashboard.module.css';

const DashboardPage = () => {
   const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
      refreshInterval: 30 * 1000, // 30 seconds
   });

   const [refreshIn, setRefreshIn] = useState(30);

   useEffect(() => {
      const interval = setInterval(() => {
         console.log('Tick');
         setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   if (!error && !data) {
      return <></>;
   }

   if (error) {
      console.log(error);
      return <span>Error al cargar la información</span>;
   }

   const {
      numberOfOrders,
      paidOrders,
      notPaidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
   } = data!;

   return (
      <AdminLayout title='Dashboard' subTitle='Estadísticas' icon={<MdOutlineDashboard />}>
         <section className={styles.dashboard}>
            <div className={styles.container}>
               <SummaryTile
                  total={numberOfOrders}
                  description={'Ordenes totales'}
                  icon={<MdOutlineDashboard />}
                  color='#40189d'
               />

               <SummaryTile
                  total={paidOrders}
                  description={'Ordenes pagadas'}
                  icon={<MdOutlineDashboard />}
                  color='#48a9f8'
               />

               <SummaryTile
                  total={notPaidOrders}
                  description={'Ordenes pendientes'}
                  icon={<MdOutlineDashboard />}
                  color='#1bd084'
               />

               <SummaryTile
                  total={numberOfClients}
                  description={'Clientes'}
                  icon={<MdOutlineDashboard />}
                  color='#8bc740'
               />

               <SummaryTile
                  total={numberOfProducts}
                  description={'Productos'}
                  icon={<MdOutlineDashboard />}
                  color='#fe8024'
               />

               <SummaryTile
                  total={productsWithNoInventory}
                  description={'Productos sin existencias'}
                  icon={<MdOutlineDashboard />}
                  color='#3065d0'
               />

               <SummaryTile
                  total={refreshIn}
                  description={'Actualización en:'}
                  icon={<MdOutlineDashboard />}
                  color='#e83e8c'
               />
            </div>
         </section>
      </AdminLayout>
   );
};

export default DashboardPage;
