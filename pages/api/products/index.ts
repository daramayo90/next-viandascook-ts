import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = { message: string } | IProduct[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getProducts(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   await db.connect();

   const page = parseInt(req.query.page as string) || 1;
   const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page

   const productIds = req.query['ids[]'] || [];

   let products;

   if (productIds.length > 0) {
      products = await Product.find({ _id: { $in: productIds } }).lean();
   } else {
      products = await Product.find()
         .skip((page - 1) * limit)
         .limit(limit)
         .sort({ name: 1 })
         .lean();
   }

   await db.disconnect();

   res.status(200).json(products);
};
