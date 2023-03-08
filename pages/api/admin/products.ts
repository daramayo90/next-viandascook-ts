import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { v2 as cloudinary } from 'cloudinary';

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getProducts(req, res);

      case 'PUT':
         return updateProduct(req, res);

      case 'POST':
         return createProduct(req, res);

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
   const { _id = '', image = '' } = req.body as IProduct;

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

      // https://res.cloudinary.com/viandascook/image/upload/v1678220438/rssbcuykhlvt6druj17f.jpg
      if (!product.image.includes(image)) {
         const img = product.image;
         const [fileId, extension] = img.substring(img.lastIndexOf('/') + 1).split('.');
         await cloudinary.uploader.destroy(fileId);
      }

      await Product.updateOne({ _id: product._id }, req.body);

      await db.disconnect();

      return res.status(200).json(product);
   } catch (error) {
      console.log(error);
      await db.disconnect();
      return res.status(400).json({ message: 'Revisar la consola del servidor' });
   }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { image = '' } = req.body as IProduct;

   if (!image) {
      return res.status(400).json({ message: 'Es necesario al menos una imágen' });
   }

   try {
      await db.connect();

      const productInDb = await Product.findOne({ slug: req.body.slug });

      if (productInDb) {
         await db.disconnect();
         return res.status(400).json({ message: 'Ya existe un producto con ese slug' });
      }

      const product = new Product(req.body);

      await product.save();

      await db.disconnect();

      return res.status(201).json(product);
   } catch (error) {
      console.log(error);
      await db.disconnect();
      return res.status(400).json({ message: 'Revisar logs del servidor' });
   }
};
