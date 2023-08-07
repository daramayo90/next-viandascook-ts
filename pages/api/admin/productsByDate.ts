import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order } from '../../../models';

type Product = {
   quantity: number;
   image: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { date } = req.body;

   const datePart = date.split('T')[0];

   const startOfDay = `${datePart}T00:00:00.000Z`;
   const endOfDay = `${datePart}T23:59:59.999Z`;

   try {
      await db.connect();

      const orders = await Order.find({
         deliveryDate: { $gte: startOfDay, $lte: endOfDay },
         isPaid: true,
      });

      await db.disconnect();

      const products: Record<string, Product> = {};

      orders.forEach((order) => {
         order.orderItems.forEach((item) => {
            if (item.name in products) {
               products[item.name].quantity += item.quantity;
            } else {
               products[item.name] = {
                  quantity: item.quantity,
                  image: item.image,
               };
            }
         });
      });

      const productsArray: Product[] = Object.keys(products).map((name) => ({
         name,
         ...products[name],
      }));

      res.status(200).json(productsArray);
   } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
   }
}
