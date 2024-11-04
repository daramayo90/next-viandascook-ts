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
         return applyDiscount(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const applyDiscount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { percentage, reset } = req.body;

   if (reset !== true && (typeof percentage !== 'number' || isNaN(percentage))) {
      return res.status(400).json({ message: 'Percentage must be a valid number' });
   }

   await db.connect();

   try {
      let products;

      if (reset === true) {
         // Reset discountPrice to null for all products
         await Product.updateMany({}, { $set: { discountPrice: null } });
         await db.disconnect();
         return res.status(200).json({
            message: 'Discount prices reset to null for all products',
         });
      } else {
         // Apply discount to products where discountPrice is null
         products = await Product.find({ discountPrice: null }).lean();

         const updatedProducts: string[] = [];
         const failedProducts: string[] = [];

         for (const product of products) {
            try {
               const originalPrice = product.price;

               let discountedPrice = originalPrice * (1 - percentage / 100);

               // Round discountedPrice to the nearest multiple of 10
               discountedPrice = Math.round(discountedPrice / 10) * 10;

               // Update the product's discountPrice
               await Product.updateOne(
                  { _id: product._id },
                  { $set: { discountPrice: discountedPrice } },
               );

               updatedProducts.push(product.name);
            } catch (error) {
               failedProducts.push(product.name);
            }
         }

         await db.disconnect();

         return res.status(200).json({
            message: 'Discount applied to products successfully',
            updatedCount: updatedProducts.length,
            failedCount: failedProducts.length,
            ...(updatedProducts.length > 0 && { updatedProducts }),
            ...(failedProducts.length > 0 && { failedProducts }),
         });
      }
   } catch (error) {
      await db.disconnect();
      return res.status(500).json({ message: 'Server error' });
   }
};
