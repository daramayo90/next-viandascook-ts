import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
   numberOfOrders: number;
   paidOrders: number;
   notPaidOrders: number;
   numberOfClients: number;
   numberOfProducts: number;
   productsWithNoInventory: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const { fecha }: any = req.query;

   await db.connect();

   const [numberOfOrders, paidOrders, numberOfClients, numberOfProducts, productsWithNoInventory] =
      await Promise.all([
         Order.find({ createdAt: { $gt: new Date(fecha) } }).count(),
         Order.find({ isPaid: true }).count(),
         User.find({ role: 'client' }).count(),
         Product.count(),
         Product.find({ inStock: 0 }).count(),
      ]);

   await db.disconnect();

   res.status(200).json({
      numberOfOrders,
      paidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      notPaidOrders: numberOfOrders - paidOrders,
   });
}
