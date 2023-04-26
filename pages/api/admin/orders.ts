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

      case 'DELETE':
         return deleteOrder(req, res);

      case 'PATCH':
         return cancelOrder(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   await db.connect();

   const orders = await Order.find()
      .sort({ createdAt: 'desc' })
      .populate('user', 'name email')
      .lean();

   await db.disconnect();

   return res.status(200).json(orders);
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

const cancelOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { id, isCancel } = req.body;

   await db.connect();

   if (isCancel) {
      await Order.updateOne(
         { _id: Number(id) },
         {
            $set: {
               isPaid: false,
               isCancel: true,
            },
         },
      );
   } else {
      await Order.updateOne(
         { _id: Number(id) },
         {
            $set: {
               isPaid: true,
               isCancel: false,
            },
         },
      );
   }

   await db.disconnect();

   return res.status(200).json({ message: 'Pedido cancelado' });
};

const deleteOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const id: number = req.body;

   await db.connect();

   await Order.deleteOne({ _id: id });

   await db.disconnect();

   return res.status(200).json({ message: 'Pedido eliminado' });
};
