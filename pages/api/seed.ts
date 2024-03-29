import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../database';
import { Product, User, Coupon, Order } from '../../models';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   if (process.env.NODE_ENV === 'production') {
      return res.status(401).json({ message: 'You do not have access to this API' });
   }

   await db.connect();

   // await Coupon.deleteMany();
   // await Coupon.insertMany(seedDatabase.initialData.coupons);

   await User.deleteMany();
   // await User.insertMany(seedDatabase.initialData.users);

   // await Product.deleteMany();
   // await Product.insertMany(seedDatabase.initialData.products);

   // await Order.deleteMany();

   await db.disconnect();

   res.status(200).json({ message: 'Process performed correctly' });
}
