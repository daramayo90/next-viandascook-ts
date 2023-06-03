import NextLink from 'next/link';

import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid';

import useSWR from 'swr';

import { IProduct } from '../../interfaces';
import { AdminLayout } from '../../components/layouts';
import { useState } from 'react';

const columns: GridColDef[] = [
   {
      field: 'img',
      headerName: 'Foto',
      width: 65,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <a href={`/plato/${row.slug}`} target='_blank' rel='noreferrer'>
               <CardMedia
                  component='img'
                  alt={row.name}
                  className='fadeIn'
                  image={row.img}
                  height='55'
               />
            </a>
         );
      },
   },
   {
      field: 'name',
      headerName: 'Nombre',
      width: 450,
      sortable: true,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <NextLink href={`/admin/products/${row.slug}`} passHref>
               <Link underline='always'>{row.name}</Link>
            </NextLink>
         );
      },
   },
   { field: 'inStock', width: 180, headerName: 'Inventario' },
   { field: 'bestSeller', width: 180, headerName: 'Más vendido' },
   { field: 'price', width: 180, headerName: 'Precio', sortable: true },
   { field: 'type', width: 840, headerName: 'Tipo' },
];

const ProductsPage = () => {
   const { data, error } = useSWR<IProduct[]>('/api/admin/products');
   const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'name', sort: 'asc' }]);

   if (!data && !error) return <></>;

   const rows = data!.map((product) => ({
      id: product._id,
      img: product.image,
      name: product.name,
      type: product.type,
      inStock: product.inStock,
      price: `$ ${product.price}`,
      slug: product.slug,
      bestSeller: product.bestSeller,
   }));

   const handleSortModelChange = (newSortModel: GridSortModel) => {
      setSortModel(newSortModel);
   };

   return (
      <AdminLayout title={`Productos (${data?.length})`} subTitle={''} icon={<CategoryOutlined />}>
         <Grid container className='fadeIn' sx={{ width: '90%', margin: 'auto', mt: 5 }}>
            <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
               <Button
                  startIcon={<AddOutlined sx={{ color: 'white' }} />}
                  color='secondary'
                  href='/admin/products/new'>
                  Crear producto
               </Button>
            </Box>

            <Grid item xs={12} sx={{ height: 720, width: '100%' }}>
               <DataGrid
                  rowHeight={65}
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[25, 50, 100]}
                  onSortModelChange={handleSortModelChange}
                  sortModel={sortModel}
               />
            </Grid>
         </Grid>
      </AdminLayout>
   );
};

export default ProductsPage;
