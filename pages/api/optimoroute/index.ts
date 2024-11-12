import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { currency } from '../../../utils';

type Data = { message: string } | AxiosResponse<any, any>;

type IOptimoRoute = {
   _id: number;
   name: string;
   email: string;
   phone: string;
   address: string;
   address2: string;
   city2: string;
   paymentMethod: string;
   total: number;
   deliveryDate: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return createOptimoRouteOrder(req, res);

      case 'PUT':
         return updateOptimoRouteOrder(req, res);

      case 'DELETE':
         return deleteOptimoRouteOrder(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const createOptimoRouteOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { _id, name, email, phone, address, address2, city2, paymentMethod, total, deliveryDate } =
      req.body as IOptimoRoute;

   const [day, month, year] = deliveryDate.split('/');
   const cash = paymentMethod === 'efectivo' ? `Efectivo: ${currency.format(total)}` : '';

   const body = {
      operation: 'CREATE',
      orderNo: _id.toString(),
      type: 'D',
      date: `${year}-${month}-${day}`,
      duration: 10,
      location: {
         address: `${address}, ${city2}`,
         locationName: `${address}, Piso/Depto: ${address2}`,
         acceptPartialMatch: true,
      },
      notes: paymentMethod !== 'mercadopago' ? `${paymentMethod}: ${currency.format(total)}` : '-',
      allowedWeekdays: ['mon', 'tue', 'wed', 'thu', 'fri'],
      email,
      phone,
      customField1: name,
   };

   const { data } = await axios.post(
      `https://api.optimoroute.com/v1/create_order?key=${process.env.OPTIMO_ROUTE_API_KEY}`,
      body,
   );

   return res.status(200).json(data);
};

const updateOptimoRouteOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { _id, deliveryDate } = req.body as { _id: number; deliveryDate: string };

   if (!_id || !deliveryDate) {
      return res.status(400).json({ message: 'Order ID and delivery date are required' });
   }

   const [year, month, day] = deliveryDate.split('T')[0].split('-');

   try {
      const { data } = await axios.post(
         `https://api.optimoroute.com/v1/create_or_update_orders?key=${process.env.OPTIMO_ROUTE_API_KEY}`,
         {
            operation: 'UPDATE',
            acceptDuplicateOrderNo: false,
            orders: [
               {
                  orderNo: _id.toString(),
                  date: `${year}-${month}-${day}`,
               },
            ],
         },
      );

      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to update order date' });
   }
};

const deleteOptimoRouteOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const _id: number = req.body;

   if (!_id) {
      return res.status(400).json({ message: 'Order ID is required' });
   }

   try {
      const { data } = await axios.post(
         `https://api.optimoroute.com/v1/delete_order?key=${process.env.OPTIMO_ROUTE_API_KEY}`,
         {
            orderNo: _id.toString(),
         },
      );

      console.log(data);

      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to deletee order' });
   }
};
