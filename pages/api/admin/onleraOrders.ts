import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces';

type Data = { message: string } | IOrder[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getOrders(req, res);

      case 'PUT':
         return updateOrder(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
   const { limit = 100, page = 0 } = req.query;

   await db.connect();

   const [total, orders] = await Promise.all([
      await Order.countDocuments(),

      await Order.find()
         .skip(Number((page as number) * 100))
         .limit(Number(limit))
         .sort({ createdAt: 'desc' })
         .populate('user', 'name email')
         .lean(),
   ]);

   await db.disconnect();

   return res.status(200).json({ total, orders });
};

const updateOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { id, deliveryDate } = req.body;

   await db.connect();

   await Order.updateOne(
      {
         _id: id,
      },
      {
         $set: {
            deliveryDate,
         },
      },
   );

   await db.disconnect();

   return res.status(200).json({ message: 'todo ok' });
};
