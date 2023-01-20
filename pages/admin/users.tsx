import { useState, useEffect } from 'react';
import { PeopleOutline } from '@mui/icons-material';
import useSWR from 'swr';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem } from '@mui/material';

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
      { field: 'name', headerName: 'Nombre Completo', width: 300 },
      { field: 'email', headerName: 'Correo', width: 250 },
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
   }));

   return (
      <AdminLayout
         title={'Usuarios'}
         subTitle={'Mantenimiento de usuarios'}
         icon={<PeopleOutline />}>
         <Grid container className='fadeIn' sx={{ width: '90%', margin: 'auto', marginTop: 5 }}>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[100]} />
            </Grid>
         </Grid>
      </AdminLayout>
   );
};

export default UsersPage;
