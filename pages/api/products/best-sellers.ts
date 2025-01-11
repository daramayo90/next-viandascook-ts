import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order } from '../../../models';
import { Product } from '../../../models';

type BestSellerData = {
   message: string;
   bestSellers?: {
      productId: string;
      name: string;
      image: string;
      totalSold: number;
   }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<BestSellerData>) {
   switch (req.method) {
      case 'GET':
         return getBestSellers(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const getBestSellers = async (req: NextApiRequest, res: NextApiResponse<BestSellerData>) => {
   await db.connect();

   try {
      const startOfYear = new Date('2024-01-01T00:00:00.000Z');
      const endOfYear = new Date('2024-12-31T23:59:59.999Z');

      // Aggregate order items by product and count total sold quantity
      const bestSellers = await Order.aggregate([
         {
            $match: { createdAt: { $gte: startOfYear, $lte: endOfYear }, isCancel: false },
         },
         { $unwind: '$orderItems' },
         {
            $group: {
               _id: '$orderItems._id',
               totalSold: { $sum: '$orderItems.quantity' },
            },
         },
         { $sort: { totalSold: -1 } }, // Sort in descending order
         // { $limit: 10 },  Optional: Limit to top 10 best-sellers
      ]);

      // Fetch product details
      const productIds = bestSellers.map((item) => item._id);
      const products = await Product.find({ _id: { $in: productIds } }, 'name image');

      const bestSellerData = bestSellers.map((item) => {
         const product = products.find((p) => p._id.toString() === item._id.toString());
         return {
            productId: item._id,
            name: product?.name || 'Unknown Product',
            image: product?.image || '',
            totalSold: item.totalSold,
         };
      });

      await db.disconnect();

      return res.status(200).json({
         message: 'Best-selling products retrieved successfully',
         bestSellers: bestSellerData,
      });
   } catch (error) {
      await db.disconnect();
      return res.status(500).json({ message: 'Server error' });
   }
};
