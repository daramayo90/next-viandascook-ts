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
   city: string;
   paymentMethod: string;
   total: number;
   deliveryDate: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return createOptimoRouteOrder(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const createOptimoRouteOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { _id, name, email, phone, address, address2, city, paymentMethod, total, deliveryDate } =
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
         address: `${address}, ${city}`,
         locationName: `${address}, Piso/Depto: ${address2}`,
         acceptPartialMatch: true,
      },
      notes: `${paymentMethod}: ${currency.format(total)}`,
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
