import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '../../components/layouts';
import { IOrder, IUser } from '../../interfaces';
import { format } from '../../utils/currency';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'Pedido', width: 180 },
   { field: 'createdAt', headerName: 'Fecha de creación', width: 180 },
   { field: 'name', headerName: 'Nombre Completo', width: 180 },
   { field: 'total', headerName: 'Total', width: 180 },
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
   {
      field: 'check',
      headerName: 'Ver pedido',
      width: 180,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
               Ver pedido
            </a>
         );
      },
   },
   { field: 'deliveryDate', headerName: 'Fecha de entrega', width: 180 },
];

const OrdersPage = () => {
   const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

   if (!data && !error) return <></>;

   const rows = data!.map((order) => ({
      id: order._id,
      email: (order.user as IUser).email,
      name: `${(order.user as IUser).name} ${(order.user as IUser).lastName}`,
      total: format(order.total),
      isPaid: order.isPaid,
      noProducts: order.numberOfItems,
      deliveryDate: order.deliveryDate,
      createdAt: formatDate(order.createdAt!),
   }));

   function formatDate(date: string) {
      const [dateFormated, time] = date.split('T');

      const [year, month, day] = dateFormated.split('-');
      const [hour, minutes] = time.split(':');

      return `${day}/${month}/${year} ${hour}:${minutes}hs`;
   }

   return (
      <AdminLayout
         title={'Pedidos'}
         subTitle={'Mantenimiento de pedidos'}
         icon={<ConfirmationNumberOutlined />}>
         <Grid container className='fadeIn' sx={{ width: '90%', margin: 'auto', marginTop: 5 }}>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid rows={rows} columns={columns} pageSize={100} rowsPerPageOptions={[100]} />
            </Grid>
         </Grid>
      </AdminLayout>
   );
};

export default OrdersPage;
