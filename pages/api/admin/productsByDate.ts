import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order } from '../../../models';

type Product = {
   quantity: number;
   image: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { date } = req.body;
   const datePart = date.split('T')[0];
   const startOfDay = `${datePart}T00:00:00.000Z`;
   const endOfDay = `${datePart}T23:59:59.999Z`;

   try {
      await db.connect();

      // Populate orderItems, and for pack items, populate the productsInPack.product details
      const orders = await Order.find({
         deliveryDate: { $gte: startOfDay, $lte: endOfDay },
         isPaid: true,
      })
         .populate({
            path: 'orderItems',
            populate: {
               path: 'productsInPack.product',
               select: 'name image',
            },
         })
         .lean();

      await db.disconnect();

      // Object to hold aggregated products.
      const products: Record<string, Product> = {};

      orders.forEach((order) => {
         order.orderItems.forEach((item) => {
            // If the item is a pack, determined by its type including 'Packs'
            if (item.type && item.type.includes('Packs')) {
               // Process only the products inside productsInPack.
               if (item.productsInPack && item.productsInPack.length > 0) {
                  item.productsInPack.forEach((packItem: any) => {
                     if (packItem.product) {
                        // Multiply the number of packs (item.quantity) by the quantity of the child product.
                        const totalQty = item.quantity * packItem.quantity;
                        const prodName = packItem.product.name;
                        const prodImage = packItem.product.image;
                        if (products[prodName]) {
                           products[prodName].quantity += totalQty;
                        } else {
                           products[prodName] = { quantity: totalQty, image: prodImage };
                        }
                     }
                  });
               }
            } else {
               // For non-pack items, aggregate normally.
               const prodName = item.name;
               if (products[prodName]) {
                  products[prodName].quantity += item.quantity;
               } else {
                  products[prodName] = { quantity: item.quantity, image: item.image };
               }
            }
         });
      });

      const productsArray = Object.keys(products).map((name) => ({
         name,
         ...products[name],
      }));

      res.status(200).json(productsArray);
   } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
   }
}
