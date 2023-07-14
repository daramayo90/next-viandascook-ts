import type { NextApiRequest, NextApiResponse } from 'next';
import mercadopago from 'mercadopago';
import { dbOrders } from '../../../database';

type Data = {
   message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return mpWebhooks(req, res);

      default:
         return res.status(400).json({ message: 'Bad Request' });
   }
}

const mpWebhooks = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN!,
   });

   const data = req.body;

   // if (data.type === 'payment') {
   //    const payment = await mercadopago.payment.get(data.data.id);
   //    const orderId = payment.body.order.external_reference;

   //    if (payment.body.status === 'approved') {
   //       await dbOrders.payOrder(orderId);
   //    }
   // }

   return res.status(200).json({ message: 'Todo ok' });
};
