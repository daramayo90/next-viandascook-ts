import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin/SummaryTile';

import { MdOutlineDashboard } from 'react-icons/md';

import styles from '../../styles/Dashboard.module.css';

const DashboardPage = () => {
   return (
      <AdminLayout title='Dashboard' subTitle='Estadísticas' icon={<MdOutlineDashboard />}>
         <section className={styles.dashboard}>
            <div className={styles.container}>
               <SummaryTile
                  total={'1'}
                  description={'Ordenes totales'}
                  icon={<MdOutlineDashboard />}
                  color='#40189d'
               />

               <SummaryTile
                  total={'2'}
                  description={'Ordenes pagadas'}
                  icon={<MdOutlineDashboard />}
                  color='#48a9f8'
               />

               <SummaryTile
                  total={'3'}
                  description={'Ordenes pendientes'}
                  icon={<MdOutlineDashboard />}
                  color='#1bd084'
               />

               <SummaryTile
                  total={'4'}
                  description={'Clientes'}
                  icon={<MdOutlineDashboard />}
                  color='#8bc740'
               />

               <SummaryTile
                  total={'5'}
                  description={'Productos'}
                  icon={<MdOutlineDashboard />}
                  color='#fe8024'
               />

               <SummaryTile
                  total={'6'}
                  description={'Productos sin existencias'}
                  icon={<MdOutlineDashboard />}
                  color='#3065d0'
               />
            </div>
         </section>
      </AdminLayout>
   );
};

export default DashboardPage;
