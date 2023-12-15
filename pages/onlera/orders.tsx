import { useState } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import {
   GridColDef,
   GridRenderCellParams,
   GridValueFormatterParams,
   GridRowModel,
} from '@mui/x-data-grid';

import useSWR from 'swr';

import { viandasApi } from '../../axiosApi';

import { ViandasLayout } from '../../components/layouts';
import { IOrder, IUser, ShippingAddress } from '../../interfaces';
import { format } from '../../utils/currency';

const DataGrid = dynamic(() => import('@mui/x-data-grid').then((module) => module.DataGrid), {
   ssr: false,
});

interface OrderData {
   total: number;
   orders: IOrder[];
}

const OnleraOrdersPage: NextPage = () => {
   const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 });
   const [rowCountState, setRowCountState] = useState(100);

   const { page } = paginationModel;
   const { data, error } = useSWR<OrderData>(`/api/admin/onleraOrders?page=${page}`);

   if (error) return <div>Error loading orders.</div>;

   const rows =
      data &&
      data.orders.map((order) => ({
         id: order._id,
         email: (order.user as IUser).email,
         name: `${(order.user as IUser).name} ${(order.user as IUser).lastName}`,
         phone: (order.user as IUser).phone,
         shipping: `
      ${(order.shippingAddress as ShippingAddress).address}, 
      Piso/Depto: ${(order.shippingAddress as ShippingAddress).address2},
      ${(order.shippingAddress as ShippingAddress).city}`,
         paymentMethod: order.paymentMethod,
         total: format(order.total),
         isPaid: order.isPaid,
         noProducts: order.numberOfItems,
         deliveryDate: order.deliveryDate,
         createdAt: order.createdAt,
      }));

   const columns: GridColDef[] = [
      { field: 'id', headerName: 'Pedido', width: 70 },
      {
         field: 'createdAt',
         headerName: 'Creado el',
         type: 'dateTime',
         width: 100,
         valueFormatter: ({ value }: GridValueFormatterParams<Date>) => {
            if (value == null) {
               return '';
            }

            return new Date(value).toLocaleDateString('es-AR', {
               timeZone: 'America/Argentina/Buenos_Aires',
            });
         },
      },
      { field: 'email', headerName: 'Email', width: 220 },
      { field: 'name', headerName: 'Nombre Completo', width: 220 },
      { field: 'phone', headerName: 'Celular', width: 120 },
      { field: 'shipping', headerName: 'Dirección', width: 380 },
      {
         field: 'isPaid',
         headerName: 'Estado',
         width: 120,
         renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid ? (
               <Chip variant='outlined' label='Completado' color='success' />
            ) : (
               <Chip variant='outlined' label='Pendiente' color='error' />
            );
         },
      },
      { field: 'noProducts', headerName: 'N° Viandas', width: 100 },
      { field: 'paymentMethod', headerName: 'Método de Pago', width: 160 },
      { field: 'total', headerName: 'Total', width: 160 },
      {
         field: 'deliveryDate',
         headerName: 'Fecha de entrega',
         type: 'date',
         editable: true,
         width: 150,
         valueFormatter: ({ value }: GridValueFormatterParams<Date>) => {
            if (value == null) {
               return '';
            }

            return new Date(value).toLocaleDateString('es-AR', {
               timeZone: 'America/Argentina/Buenos_Aires',
            });
         },
      },
   ];

   // Make the HTTP request to save in the backend
   const processRowUpdate = async (newRow: GridRowModel) => {
      await viandasApi.put('/admin/onleraOrders', newRow);
      return newRow;
   };

   return (
      <ViandasLayout title={'Ver Pedidos'} icon={<ConfirmationNumberOutlined />}>
         <Grid container className='fadeIn' sx={{ width: '90%', margin: 'auto', mt: 5 }}>
            <Grid item xs={12} sx={{ height: 790, width: '100%' }}>
               <DataGrid
                  rows={rows || []}
                  columns={columns}
                  pageSizeOptions={[25, 50, 100]}
                  processRowUpdate={processRowUpdate}
                  paginationMode='server'
                  rowCount={rowCountState}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  loading={!data}
               />
            </Grid>
         </Grid>
      </ViandasLayout>
   );
};

export default OnleraOrdersPage;
