import Link from 'next/link';

import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Button, Chip, Grid } from '@mui/material';
import {
   DataGrid,
   GridColDef,
   GridRenderCellParams,
   GridValueFormatterParams,
   GridRowModel,
} from '@mui/x-data-grid';

import useSWR, { mutate } from 'swr';

import { viandasApi } from '../../axiosApi';

import { AdminLayout } from '../../components/layouts';
import { IOrder, IUser, ShippingAddress } from '../../interfaces';

import { format } from '../../utils/currency';

const OrdersPage = () => {
   const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

   if (!data && !error) return <></>;

   const rows = data!.map((order) => ({
      id: order._id,
      email: (order.user as IUser).email,
      name: `${(order.user as IUser).name} ${(order.user as IUser).lastName}`,
      address: `${(order.shippingAddress as ShippingAddress).city}`,
      paymentMethod: order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1),
      total: format(order.total),
      isPaid: order.isPaid,
      isCancel: order.isCancel,
      noProducts: order.numberOfItems,
      deliveryDate: order.deliveryDate,
      createdAt: order.createdAt,
   }));

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
      { field: 'name', headerName: 'Nombre Completo', width: 200 },
      { field: 'address', headerName: 'Ciudad', width: 150 },
      {
         field: 'isPaid',
         headerName: 'Estado',
         width: 160,
         renderCell: ({ row }: GridRenderCellParams) => {
            if (row.isCancel && !row.isPaid) {
               return (
                  <Chip
                     variant='filled'
                     label='Cancelado'
                     color='error'
                     sx={{
                        minWidth: 120,
                        pt: 0.3,
                        '& .MuiChip-label': {
                           color: 'white',
                        },
                     }}
                  />
               );
            }

            if (!row.isCancel && !row.isPaid) {
               return (
                  <Chip
                     variant='outlined'
                     label='Pendiente'
                     color='error'
                     sx={{
                        minWidth: 120,
                        pt: 0.3,
                     }}
                  />
               );
            }

            return (
               <Chip
                  variant='outlined'
                  label='Completado'
                  color='success'
                  sx={{
                     minWidth: 120,
                     pt: 0.3,
                  }}
               />
            );
         },
      },
      { field: 'paymentMethod', headerName: 'Método de Pago', width: 160 },
      { field: 'total', headerName: 'Total', width: 160 },
      {
         field: 'deliveryDate',
         headerName: 'Fecha de entrega',
         type: 'date',
         editable: true,
         width: 160,
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
         width: 160,
         renderCell: ({ row }: GridRenderCellParams) => {
            return (
               <Link href={`/admin/pedido/${row.id}`}>
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Ver pedido</span>
               </Link>
            );
         },
      },
      {
         field: 'cancel',
         headerName: 'Cancelar',
         width: 180,
         renderCell: ({ row }: GridRenderCellParams) => {
            return !row.isCancel ? (
               <Button variant='contained' color='warning' onClick={() => handleCancel(row, true)}>
                  Cancelar Pedido
               </Button>
            ) : (
               <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => handleCancel(row, false)}>
                  Completar Pedido
               </Button>
            );
         },
      },
      {
         field: 'delete',
         headerName: 'Eliminar',
         width: 180,
         renderCell: ({ row }: GridRenderCellParams) => {
            return (
               <Button variant='contained' color='primary' onClick={() => handleDelete(row)}>
                  Eliminar Pedido
               </Button>
            );
         },
      },
   ];

   const processRowUpdate = async (newRow: GridRowModel) => {
      await viandasApi.put('/admin/orders', newRow);
      return newRow;
   };

   const handleDelete = async (row: GridRenderCellParams) => {
      await viandasApi.delete('/admin/orders', { data: row.id });
      mutate('/api/admin/orders');
   };

   const handleCancel = async (row: GridRenderCellParams, isCancel: boolean) => {
      await viandasApi.patch('/admin/orders', { id: row.id, isCancel });
      mutate('/api/admin/orders');
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

export default OrdersPage;
