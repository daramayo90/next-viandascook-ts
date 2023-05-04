import { FC } from 'react';

import { Grid, Card, CardContent, Typography } from '@mui/material';

interface Props {
   total: string | number;
   description: string;
   icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ total, description, icon }) => {
   return (
      <Grid item xs={12} sm={6} md={4}>
         <Card sx={{ display: 'flex' }}>
            <CardContent
               sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               {/* <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} /> */}
               {icon}
            </CardContent>
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
               <Typography variant='h3'>{total}</Typography>
               <Typography variant='caption'>{description}</Typography>
            </CardContent>
         </Card>
      </Grid>
   );
};
