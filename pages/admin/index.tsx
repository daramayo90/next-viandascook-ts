import { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
   AttachMoneyOutlined,
   CreditCardOffOutlined,
   CreditCardOutlined,
   DashboardOutlined,
   GroupOutlined,
   CategoryOutlined,
   CancelPresentationOutlined,
   AccessTimeOutlined,
} from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '../../components/admin';
import { DashboardSummaryResponse } from '../../interfaces';
import viandasApi from '../../axiosApi/viandasApi';

const DashboardPage = () => {
   // const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
   //    refreshInterval: 30 * 1000, // 30 segundos
   // });

   // const [refreshIn, setRefreshIn] = useState(30);

   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
   //    }, 1000);

   //    return () => clearInterval(interval);
   // }, []);

   // if (!error && !data) {
   //    return <></>;
   // }

   // if (error) {
   //    console.log(error);
   //    return <Typography>Error al cargar la información</Typography>;
   // }

   const [info, setInfo] = useState<DashboardSummaryResponse>();
   const [miFecha, setMiFecha] = useState('01/01/1900');

   useEffect(() => {
      const getData = async () => {
         const { data } = await viandasApi.get<DashboardSummaryResponse>('/admin/dashboard', {
            params: { fecha: miFecha },
         });
         setInfo(data);
      };

      getData();
   }, [miFecha]);

   if (!info) {
      return <></>;
   }

   const {
      numberOfOrders,
      paidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      notPaidOrders,
   } = info!;

   return (
      <AdminLayout title='Dashboard' subTitle='Estadisticas generales' icon={<DashboardOutlined />}>
         <Grid container spacing={2} sx={{ width: '90%', margin: 'auto', marginTop: 5 }}>
            <SummaryTile
               total={numberOfOrders}
               description='Ordenes totales'
               icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={paidOrders}
               description='Ordenes pagadas'
               icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={notPaidOrders}
               description='Ordenes pendientes'
               icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={numberOfClients}
               description='Clientes'
               icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={numberOfProducts}
               description='Productos'
               icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={productsWithNoInventory}
               description='Sin existencias'
               icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
            />

            {/* <SummaryTile
               total={refreshIn}
               description='Actualización en:'
               icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
            /> */}
         </Grid>
      </AdminLayout>
   );
};

export default DashboardPage;
