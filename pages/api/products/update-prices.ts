import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';

type Data = {
   message: string;
   updatedCount?: number;
   failedCount?: number;
   updatedProducts?: string[];
   failedProducts?: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return updateProductPrices(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const updateProductPrices = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { percentage } = req.body;

   if (typeof percentage !== 'number') {
      return res.status(400).json({ message: 'Percentage must be a number' });
   }

   await db.connect();

   try {
      const products = await Product.find().lean();

      const updatedProducts: string[] = [];
      const failedProducts: string[] = [];

      for (const product of products) {
         try {
            const originalPrice = product.price;

            let newPrice = originalPrice * (1 + percentage / 100);

            // Round newPrice to the nearest multiple of 10
            newPrice = Math.round(newPrice / 10) * 10;

            // Update the product's price
            await Product.updateOne({ _id: product._id }, { $set: { price: newPrice } });

            updatedProducts.push(product.name);
         } catch (error) {
            failedProducts.push(product.name);
         }
      }

      await db.disconnect();

      return res.status(200).json({
         message: 'Product prices updated successfully',
         updatedCount: updatedProducts.length,
         failedCount: failedProducts.length,
         ...(updatedProducts.length > 0 && { updatedProducts }),
         ...(failedProducts.length > 0 && { failedProducts }),
      });
   } catch (error) {
      await db.disconnect();
      return res.status(500).json({ message: 'Server error' });
   }
};
