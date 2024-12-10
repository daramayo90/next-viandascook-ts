import { useState, useEffect } from 'react';
import { NextPage } from 'next';

import dynamic from 'next/dynamic';

import {
   CheckCircleOutlined,
   AttachMoneyOutlined,
   DashboardOutlined,
   LocalAtmOutlined,
   ShoppingBagOutlined,
   DiscountOutlined,
} from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts';
import { SummaryTile } from '../../../components/admin';
import { DashboardSummaryResponse } from '../../../interfaces';
import { currency } from '../../../utils';
import viandasApi from '../../../axiosApi/viandasApi';

const Grid = dynamic(() => import('@mui/material').then((module) => module.Grid), {
   ssr: false,
});

const DateRangePicker = dynamic(
   () => import('../../../components/admin').then((module) => module.DateRangePicker),
   {
      ssr: false,
   },
);

const DashboardPage: NextPage = () => {
   const [info, setInfo] = useState<DashboardSummaryResponse>();
   const [startDate, setStartDate] = useState<Date>();
   const [endDate, setEndDate] = useState<Date>();

   useEffect(() => {
      const getData = async () => {
         const { data } = await viandasApi.get<DashboardSummaryResponse>(
            '/admin/dashboard-fecha-entrega',
            {
               params: { startDate, endDate },
            },
         );
         setInfo(data);
      };

      getData();
   }, [startDate, endDate]);

   if (!info) {
      return <></>;
   }

   const {
      paidOrders,
      totalIncome,
      numberOfSelledProducts,
      discounts,
      mpIncome,
      cashIncome,
      transferIncome,
   } = info!;

   return (
      <AdminLayout title='Dashboard Por Fecha de Entrega' subTitle='' icon={<DashboardOutlined />}>
         <DateRangePicker
            start={startDate}
            setStart={setStartDate}
            end={endDate}
            setEnd={setEndDate}
         />

         <Grid container spacing={3} sx={{ width: '90%', margin: 'auto', marginTop: 5 }}>
            <SummaryTile
               total={currency.formatWithoutDecimals(totalIncome)}
               description='Ingresos totales'
               icon={<LocalAtmOutlined color='secondary' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
               total={currency.formatWithoutDecimals(mpIncome)}
               description='Ingresos con Mercado Pago'
            />

            <SummaryTile
               total={currency.formatWithoutDecimals(cashIncome)}
               description='Ingresos con Efectivo'
               icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={currency.formatWithoutDecimals(transferIncome)}
               description='Ingresos con Transferencia'
               icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={currency.formatWithoutDecimals(discounts)}
               description='Descuentos aplicados'
               icon={<DiscountOutlined color='secondary' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={paidOrders}
               description='Pedidos completados'
               icon={<CheckCircleOutlined color='success' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={numberOfSelledProducts}
               description='Viandas vendidas'
               icon={<ShoppingBagOutlined color='secondary' sx={{ fontSize: 40 }} />}
            />
         </Grid>
      </AdminLayout>
   );
};

export default DashboardPage;
