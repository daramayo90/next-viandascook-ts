import { db } from './';
import { Product } from '../models';
import { IProduct } from '../interfaces';

export const getAllProducts = async (): Promise<IProduct[]> => {
   await db.connect();

   const products = await Product.find().lean();

   await db.disconnect();

   return JSON.parse(JSON.stringify(products));
};
