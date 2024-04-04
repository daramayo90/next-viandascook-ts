import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '../../../models';
import { IUser, ShippingAddress } from '../../../interfaces';

type Data = {
   message: string;
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
   const { orderId } = req.body;

   const API_KEY = process.env.MAILCHIMP_API_KEY!;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER!;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/orders`;

   const order = await Order.findById(Number(orderId)).lean();

   if (!order) {
      return res.status(404).json({ message: 'Order not found' });
   }

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
         } catch (postError: any) {
            return res.status(500).json({ message: postError.response.data.message });
         }
      }
   }

   return res.status(201).json({ message: 'Order sync process completed' });
};
