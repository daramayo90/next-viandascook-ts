import { useState, useEffect } from 'react';
import { AddOutlined, PeopleOutline } from '@mui/icons-material';
import useSWR from 'swr';

import {
   DataGrid,
   GridColDef,
   GridRenderCellParams,
   GridValueFormatterParams,
} from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box, Button } from '@mui/material';

import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';
import { viandasApi } from '../../axiosApi';

const UsersPage = () => {
   const { data, error } = useSWR<IUser[]>('/api/admin/users');
   const [users, setUsers] = useState<IUser[]>([]);

   useEffect(() => {
      if (data) {
         setUsers(data);
      }
   }, [data]);

   if (!data && !error) return <></>;

   const onRoleUpdated = async (userId: string, newRole: string) => {
      const previosUsers = users.map((user) => ({ ...user }));
      const updatedUsers = users.map((user) => ({
         ...user,
         role: userId === user._id ? newRole : user.role,
      }));

      setUsers(updatedUsers);

      try {
         await viandasApi.put('/admin/users', { userId, role: newRole });
      } catch (error) {
         setUsers(previosUsers);
         console.log(error);
         alert('No se pudo actualizar el role del usuario');
      }
   };

   const columns: GridColDef[] = [
      {
         field: 'createdAt',
         headerName: 'Creado el',
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
         field: 'updatedAt',
         headerName: 'Actualiado el',
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
      { field: 'name', headerName: 'Nombre Completo', width: 300 },
      { field: 'email', headerName: 'Correo', width: 300 },
      {
         field: 'role',
         headerName: 'Rol',
         width: 300,
         renderCell: ({ row }: GridRenderCellParams) => {
            return (
               <Select
                  value={row.role}
                  label='Rol'
                  onChange={({ target }) => onRoleUpdated(row.id, target.value)}
                  sx={{ width: '300px' }}>
                  <MenuItem value='admin'> Admin </MenuItem>
                  <MenuItem value='client'> Client </MenuItem>
                  <MenuItem value='super-user'> Super User </MenuItem>
                  <MenuItem value='SEO'> SEO </MenuItem>
               </Select>
            );
         },
      },
   ];

   const rows = users.map((user) => ({
      id: user._id,
      email: user.email,
      name: `${user.name} ${user.lastName}`,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
   }));

   return (
      <AdminLayout title={'Mantenimiento de usuarios'} subTitle={''} icon={<PeopleOutline />}>
         <Grid container className='fadeIn' sx={{ width: '90%', margin: 'auto', marginTop: 5 }}>
            <Box display='flex' justifyContent='space-between' sx={{ mb: 2, width: 320 }}>
               <Button
                  startIcon={<AddOutlined sx={{ color: 'white' }} />}
                  color='secondary'
                  href='/admin/users/new'>
                  Nuevo usuario
               </Button>

               <Button
                  startIcon={<AddOutlined sx={{ color: 'white' }} />}
                  color='secondary'
                  href='/admin/users/importacion-masiva'>
                  Importación masiva
               </Button>
            </Box>

            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid rows={rows} columns={columns} pageSizeOptions={[25, 50, 100]} />
            </Grid>
         </Grid>
      </AdminLayout>
   );
};

export default UsersPage;
