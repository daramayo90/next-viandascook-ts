import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order } from '../../../models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { date } = req.body;

   try {
      await db.connect();

      const orders = await Order.find({ deliveryDate: date }).select(
         '_id user orderItems numberOfItems',
      );

      await db.disconnect();

      res.status(200).json(orders);
   } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
   }
}
