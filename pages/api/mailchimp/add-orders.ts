import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '../../../models';
import { IOrder, IUser, ShippingAddress } from '../../../interfaces';

type Data = {
   message: string;
   failed?: string[];
   skipped?: string[];
   updated?: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return AddOrders(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const AddOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const API_KEY = process.env.MAILCHIMP_API_KEY!;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER!;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/orders`;

   const orders: IOrder[] = await Order.find().sort({ createdAt: -1 }).lean();

   const failedOrders: string[] = [];
   const skippedOrders: string[] = [];
   const updatedOrders: string[] = [];

   const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

   for (const order of orders) {
      const { _id, name, lastName, email, dni } = order.user as IUser;
      const { address, city, city2, zipcode } = order.shippingAddress as ShippingAddress;

      const orderEndpoint = `${ENDPOINT}/${order._id!}`;

      try {
         // Attempt to fetch the order from Mailchimp to see if it exists
         await axios.get(orderEndpoint, {
            headers: {
               Authorization: `Bearer ${API_KEY}`,
            },
         });

         skippedOrders.push(order._id!.toString());
      } catch (error: any) {
         // Order does not exist, so we create it
         if (error.response && error.response.status === 404) {
            const orderData = {
               id: order._id!.toString(),
               customer: {
                  id: _id ? _id.toString() : dni,
                  email_address: email,
                  opt_in_status: true,
                  first_name: name,
                  last_name: lastName,
                  address: {
                     address1: address,
                     city: city2,
                     province: city,
                     postal_code: zipcode,
                     country: 'Argentina',
                     country_code: 'AR',
                  },
               },
               currency_code: 'ARS',
               order_total: order.total,
               lines: order.orderItems.map((item, index) => ({
                  id: item._id.toString(),
                  product_id: item._id.toString(),
                  product_variant_id: item._id.toString(),
                  quantity: item.quantity,
                  price: item.price,
               })),
               shipping_address: {
                  name: `${name} ${lastName}`,
                  address1: address,
                  city: city2,
                  province: city,
                  postal_code: zipcode,
                  country: 'Argentina',
                  country_code: 'AR',
               },
               processed_at_foreign: order.createdAt,
               financial_status: order.isPaid ? 'paid' : 'cancelled',
               fulfillment_status: order.isPaid ? 'paid' : 'cancelled',
            };

            try {
               await axios.post(ENDPOINT, orderData, {
                  headers: {
                     Authorization: `Bearer ${API_KEY}`,
                  },
               });
               updatedOrders.push(order._id!.toString());
            } catch (postError: any) {
               if (postError.response && postError.response.status === 429) {
                  await delay(60000); // Delay for 1 minute
                  try {
                     await axios.post(ENDPOINT, orderData, {
                        headers: {
                           Authorization: `Bearer ${API_KEY}`,
                        },
                     });
                     updatedOrders.push(order._id!.toString());
                  } catch (retryError) {
                     failedOrders.push(order._id!.toString());
                  }
               } else {
                  failedOrders.push(order._id!.toString());
               }
            }
         } else {
            failedOrders.push(order._id!.toString());
         }
      }

      await delay(1000); // Throttle requests to avoid hitting rate limits
   }

   const responseMessage = {
      message: 'Order sync process completed',
      ...(failedOrders.length > 0 && { failed: failedOrders }),
      ...(skippedOrders.length > 0 && { skipped: skippedOrders }),
      ...(updatedOrders.length > 0 && { updated: updatedOrders }),
   };

   return res.status(201).json(responseMessage);
};
