import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import {
   DataGrid,
   GridColDef,
   GridRenderCellParams,
   GridValueFormatterParams,
   GridRowModel,
} from '@mui/x-data-grid';

import useSWR from 'swr';

import { viandasApi } from '../../axiosApi';

import { AdminLayout } from '../../components/layouts';
import { IOrder, IUser } from '../../interfaces';

import { format } from '../../utils/currency';
import Link from 'next/link';

const OrdersPage = () => {
   const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

   if (!data && !error) return <></>;

   const rows = data!.map((order) => ({
      id: order._id,
      email: (order.user as IUser).email,
      name: `${(order.user as IUser).name} ${(order.user as IUser).lastName}`,
      paymentMethod: order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1),
      total: format(order.total),
      isPaid: order.isPaid,
      noProducts: order.numberOfItems,
      deliveryDate: order.deliveryDate,
      createdAt: order.createdAt,
   }));

   // Make the HTTP request to save in the backend
   const processRowUpdate = async (newRow: GridRowModel) => {
      const response = await viandasApi.put('/admin/orders', newRow);
      return newRow;
   };

   return (
      <AdminLayout
         title={'Mantenimiento de pedidos'}
         subTitle={''}
         icon={<ConfirmationNumberOutlined />}>
         <Grid container className='fadeIn' sx={{ width: '90%', margin: 'auto', mt: 5 }}>
            <Grid item xs={12} sx={{ height: 790, width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[25, 50, 100]}
                  processRowUpdate={processRowUpdate}
               />
            </Grid>
         </Grid>
      </AdminLayout>
   );
};

const columns: GridColDef[] = [
   { field: 'id', headerName: 'Pedido', width: 100 },
   {
      field: 'createdAt',
      headerName: 'Fecha de creación',
      type: 'dateTime',
      width: 180,
      valueFormatter: ({ value }: GridValueFormatterParams<Date>) => {
         if (value == null) {
            return '';
         }

         return new Date(value).toLocaleString('es-AR');
      },
   },
   { field: 'name', headerName: 'Nombre Completo', width: 320 },
   {
      field: 'isPaid',
      headerName: 'Estado',
      width: 180,
      renderCell: ({ row }: GridRenderCellParams) => {
         return row.isPaid ? (
            <Chip variant='outlined' label='Completado' color='success' />
         ) : (
            <Chip variant='outlined' label='Pendiente' color='error' />
         );
      },
   },
   { field: 'paymentMethod', headerName: 'Método de Pago', width: 180 },
   { field: 'total', headerName: 'Total', width: 180 },
   {
      field: 'deliveryDate',
      headerName: 'Fecha de entrega',
      type: 'date',
      editable: true,
      width: 180,
      valueFormatter: ({ value }: GridValueFormatterParams<Date>) => {
         if (value == null) {
            return '';
         }

         return new Date(value).toLocaleDateString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
         });
      },
   },
   {
      field: 'check',
      headerName: 'Ver pedido',
      width: 180,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <Link href={`/admin/pedido/${row.id}`}>
               <span style={{ textDecoration: 'underline' }}>Ver pedido</span>
            </Link>
         );
      },
   },
];

export default OrdersPage;
