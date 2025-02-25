import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order } from '../../../models';

type Data = { message: string } | IOrder[] | IOrder;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return getOrdersByDate(req, res);

      case 'GET':
         return getOrderById(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const getOrdersByDate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { date } = req.body;

   const datePart = date.split('T')[0];

   const startOfDay = `${datePart}T00:00:00.000Z`;
   const endOfDay = `${datePart}T23:59:59.999Z`;

   try {
      await db.connect();

      const orders: IOrder[] = await Order.find({
         deliveryDate: { $gte: startOfDay, $lte: endOfDay },
         isPaid: true,
      })
         .populate({
            path: 'orderItems', // populate order items first
            populate: {
               path: 'productsInPack.product', // then populate the product field inside productsInPack
               select: 'name', // select the fields you need
            },
         })
         .lean();

      await db.disconnect();

      res.status(200).json(orders);
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error en el servidor' });
   }
};

const getOrderById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { orderId } = req.query;

   try {
      await db.connect();

      const order = await Order.findById(Number(orderId))
         .populate({
            path: 'orderItems', // populate order items first
            populate: {
               path: 'productsInPack.product', // then populate the product field inside productsInPack
               select: 'name', // select the fields you need
            },
         })
         .lean();

      await db.disconnect();

      if (!order) return res.status(400).json({ message: 'No existe pedido' });

      res.status(200).json(order);
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error en el servidor' });
   }
};
