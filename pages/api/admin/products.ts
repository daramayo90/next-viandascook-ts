import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = { message: string } | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getProducts(req, res);

      case 'PUT':

      case 'POST':

      default:
         return res.status(200).json({ message: 'Bad Request' });
   }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   await db.connect();

   const products = await Product.find().sort({ title: 'asc' }).lean();

   await db.disconnect();

   res.status(200).json(products);
};