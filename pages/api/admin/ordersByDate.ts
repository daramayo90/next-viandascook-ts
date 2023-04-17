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
   console.log(date);

   try {
      await db.connect();

      const orders: IOrder[] = await Order.find({ deliveryDate: date, isPaid: true });

      console.log(orders);

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

      const order = await Order.findById(Number(orderId)).lean();

      await db.disconnect();

      if (!order) return res.status(400).json({ message: 'No existe pedido' });

      res.status(200).json(order);
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error en el servidor' });
   }
};
