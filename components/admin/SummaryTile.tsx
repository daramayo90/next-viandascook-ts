import { FC } from 'react';

import { Grid, Card, CardContent, Typography } from '@mui/material';

interface Props {
   total: string | number;
   description: string;
   icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ total, description, icon }) => {
   return (
      <Grid
         item
         xs={12}
         sm={6}
         md={3}
         sx={{
            paddingLeft: '0px !important',
            paddingTop: '0px !important',
            margin: {
               xs: '15px 0', // Mobile: 15px top and bottom, 0px left and right
               md: '15px 20px 15px 0', // Desktop: 15px all around
            },
         }}>
         <Card sx={{ display: 'flex' }}>
            <CardContent
               sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               {icon}
            </CardContent>
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
               <Typography variant='h4'>{total}</Typography>
               <Typography variant='caption'>{description}</Typography>
            </CardContent>
         </Card>
      </Grid>
   );
};
