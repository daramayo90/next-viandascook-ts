import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getProducts(req, res);

      case 'PUT':
         return updateProduct(req, res);

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

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { _id = '', image } = req.body as IProduct;

   if (!isValidObjectId) {
      return res.status(400).json({ message: 'El id del producto no es válido' });
   }

   if (!image) {
      return res.status(400).json({ message: 'Es necesario al menos una imágen' });
   }

   try {
      await db.connect();

      const product = await Product.findById(_id);

      if (!product) {
         await db.disconnect();
         return res.status(400).json({ message: 'No existe un producto con ese id' });
      }

      await product.update(req.body);

      await db.disconnect();

      return res.status(200).json(product);
   } catch (error) {
      console.log(error);
      await db.disconnect();
      return res.status(400).json({ message: 'Revisar la consola del servidor' });
   }
};
