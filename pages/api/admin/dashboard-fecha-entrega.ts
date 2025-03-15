import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';
import { DashboardSummaryResponse } from '../../../interfaces';

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<DashboardSummaryResponse>,
) {
   const { startDate = new Date('01/01/1900'), endDate = new Date('01/01/2900') }: any = req.query;

   const start = new Date(startDate);
   start.setHours(0, 0, 0, 0); // Set the start date to the beginning of the day

   const end = new Date(endDate);
   end.setHours(23, 59, 59, 999); // Set the end date to the end of the day

   await db.connect();

   const [
      summaryData,
      paidOrders,
      cancelOrders,
      discounts,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
   ] = await Promise.all([
      Order.aggregate([
         {
            $match: {
               isPaid: true,
               deliveryDate: { $gte: start, $lte: end },
            },
         },
         {
            // Add a computed field for each order that sums all individual products sold,
            // expanding packs to the sum of their inner products.
            $addFields: {
               computedSoldProducts: {
                  $sum: {
                     $map: {
                        input: '$orderItems',
                        as: 'item',
                        in: {
                           $cond: {
                              // If the order item is a pack (has products inside)
                              if: {
                                 $gt: [{ $size: { $ifNull: ['$$item.productsInPack', []] } }, 0],
                              },
                              then: {
                                 $multiply: [
                                    '$$item.quantity',
                                    {
                                       $reduce: {
                                          input: '$$item.productsInPack',
                                          initialValue: 0,
                                          in: { $add: ['$$value', '$$this.quantity'] },
                                       },
                                    },
                                 ],
                              },
                              // Otherwise, use the order item quantity directly.
                              else: '$$item.quantity',
                           },
                        },
                     },
                  },
               },
            },
         },
         {
            // Group by payment method, summing the total income and computed sold products.
            $group: {
               _id: '$paymentMethod',
               totalIncome: { $sum: '$total' },
               numberOfSelledProducts: { $sum: '$computedSoldProducts' },
               count: { $sum: 1 },
            },
         },
      ]),
      Order.find({ isPaid: true, deliveryDate: { $gte: start, $lte: end } }).count(),
      Order.find({ isCancel: true, deliveryDate: { $gte: start, $lte: end } }).count(),
      Order.aggregate([
         { $match: { isPaid: true, deliveryDate: { $gte: start, $lte: end } } },
         { $group: { _id: null, discounts: { $sum: '$discount' } } },
      ]),
      User.find({ role: 'client' }).count(),
      Product.count(),
      Product.find({ inStock: 0 }).count(),
   ]);

   const summary = summaryData.reduce(
      (acc, item) => {
         acc.totalIncome += item.totalIncome;
         acc.numberOfSelledProducts += item.numberOfSelledProducts;
         acc.numberOfOrders += item.count;
         switch (item._id) {
            case 'mercadopago':
               acc.mpIncome = item.totalIncome;
               acc.mpOrders = item.count;
               break;
            case 'efectivo':
               acc.cashIncome = item.totalIncome;
               acc.cashOrders = item.count;
               break;
            case 'transferencia':
               acc.transferIncome = item.totalIncome;
               acc.transferOrders = item.count;
               break;
         }
         return acc;
      },
      {
         numberOfOrders: 0,
         totalIncome: 0,
         numberOfSelledProducts: 0,
         mpIncome: 0,
         cashIncome: 0,
         transferIncome: 0,
         mpOrders: 0,
         cashOrders: 0,
         transferOrders: 0,
      },
   );

   const totalDiscounts = discounts.length > 0 ? discounts[0].discounts : 0;

   await db.disconnect();

   res.status(200).json({
      ...summary,
      paidOrders,
      cancelOrders,
      discounts: totalDiscounts,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
   });
}
