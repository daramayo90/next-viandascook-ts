import { db } from './';
import { Product } from '../models';
import { IProduct } from '../interfaces';

interface ProductSlug {
   slug: string;
}

export const getAllProducts = async (): Promise<IProduct[]> => {
   await db.connect();

   const products = await Product.find().sort({ name: 1 }).lean();

   await db.disconnect();

   return JSON.parse(JSON.stringify(products));
};

export const getAllProductSlug = async (): Promise<ProductSlug[]> => {
   await db.connect();

   const slugs = await Product.find().select('slug -_id').lean();

   await db.disconnect();

   return slugs;
};

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
   await db.connect();

   const product: IProduct | null = await Product.findOne({ slug }).lean();

   await db.disconnect();

   if (!product) return null;

   return JSON.parse(JSON.stringify(product));
};

export const getAllBestSellersProducts = async (): Promise<IProduct[] | null> => {
   await db.connect();

   const products = await Product.find({ bestSeller: true }).lean();

   await db.disconnect();

   if (!products) return null;

   return JSON.parse(JSON.stringify(products));
};

export const getRelatedProducts = async (product: IProduct): Promise<IProduct[] | null> => {
   await db.connect();

   const { _id, type } = product;

   const query = {
      _id: { $ne: _id }, // $ne: not equal
      type: { $in: type }, // $in: in
   };

   const products = await Product.find(query).limit(10).lean();

   await db.disconnect();

   if (!products) return null;

   return JSON.parse(JSON.stringify(products));
};

export const getCrossSellingProducts = async (type: string): Promise<IProduct[] | null> => {
   await db.connect();

   const products = await Product.find({ type: { $in: [type] } }).lean();

   await db.disconnect();

   if (!products) return null;

   return JSON.parse(JSON.stringify(products));
};
