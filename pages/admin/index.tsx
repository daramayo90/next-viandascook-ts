import { useState, useEffect } from 'react';
import { NextPage } from 'next';

import { Grid, Typography } from '@mui/material';
import {
   ShoppingCartOutlined,
   CheckCircleOutlined,
   RemoveShoppingCartOutlined,
   CreditScoreOutlined,
   PaymentsOutlined,
   AccountBalanceOutlined,
   AttachMoneyOutlined,
   CreditCardOffOutlined,
   CreditCardOutlined,
   DashboardOutlined,
   GroupOutlined,
   CategoryOutlined,
   CancelPresentationOutlined,
   LocalAtmOutlined,
   ShoppingBagOutlined,
   DiscountOutlined,
} from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts';
import { DateRangePicker, SummaryTile } from '../../components/admin';
import { DashboardSummaryResponse } from '../../interfaces';
import viandasApi from '../../axiosApi/viandasApi';
import { currency } from '../../utils';

const DashboardPage: NextPage = () => {
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
   const [startDate, setStartDate] = useState<Date>();
   const [endDate, setEndDate] = useState<Date>();

   useEffect(() => {
      const getData = async () => {
         const { data } = await viandasApi.get<DashboardSummaryResponse>('/admin/dashboard', {
            params: { startDate, endDate },
         });
         setInfo(data);
      };

      getData();
   }, [startDate, endDate]);

   if (!info) {
      return <></>;
   }

   const {
      numberOfOrders,
      paidOrders,
      cancelOrders,
      totalIncome,
      numberOfSelledProducts,
      discounts,
      mpOrders,
      cashOrders,
      transferOrders,
      mpIncome,
      cashIncome,
      transferIncome,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
   } = info!;

   return (
      <AdminLayout title='Dashboard' subTitle='Estadisticas generales' icon={<DashboardOutlined />}>
         <DateRangePicker
            start={startDate}
            setStart={setStartDate}
            end={endDate}
            setEnd={setEndDate}
         />

         <Grid container spacing={3} sx={{ width: '90%', margin: 'auto', marginTop: 5 }}>
            <SummaryTile
               total={currency.format(totalIncome)}
               description='Ingresos totales'
               icon={<LocalAtmOutlined color='secondary' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
               total={currency.format(mpIncome)}
               description='Ingresos con Mercado Pago'
            />

            <SummaryTile
               total={currency.format(cashIncome)}
               description='Ingresos con Efectivo'
               icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={currency.format(transferIncome)}
               description='Ingresos con Transferencia'
               icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={currency.format(discounts)}
               description='Descuentos aplicados'
               icon={<DiscountOutlined color='secondary' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={numberOfOrders}
               description='Pedidos totales'
               icon={<ShoppingCartOutlined color='success' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={paidOrders}
               description='Pedidos completados'
               icon={<CheckCircleOutlined color='success' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={cancelOrders}
               description='Pedidos cancelados'
               icon={<RemoveShoppingCartOutlined color='error' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={numberOfSelledProducts}
               description='Viandas vendidas'
               icon={<ShoppingBagOutlined color='secondary' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               icon={<CreditScoreOutlined color='warning' sx={{ fontSize: 40 }} />}
               total={mpOrders}
               description='Pedidos con Mercado Pago'
            />

            <SummaryTile
               total={cashOrders}
               description='Pedidos con Efectivo'
               icon={<PaymentsOutlined color='warning' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={transferOrders}
               description='Pedidos con Transferencia'
               icon={<AccountBalanceOutlined color='warning' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={numberOfClients}
               description='Clientes en la base de datos'
               icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={numberOfProducts}
               description='Viandas en total'
               icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
            />

            <SummaryTile
               total={productsWithNoInventory}
               description='Viandas sin existencias'
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
