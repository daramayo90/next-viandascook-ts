import React, { FC } from 'react';
import { IOrder } from '../../interfaces';

interface Props {
   items: IOrder;
}

export const OrderProducts: FC<Props> = ({ items }) => {
   console.log(items);
   return <div>OrderProducts</div>;
};
