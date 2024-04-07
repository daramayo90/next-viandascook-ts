import type { NextApiRequest, NextApiResponse } from 'next';
import { PaymentGetResponse } from 'mercadopago/resources/payment';
import { dbOrders } from '../../../database';
import mercadopago from 'mercadopago';

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

   const url = req.headers.origin ?? '';
   const data = req.body;
   const referralCoupon = req.cookies.referralCoupon ?? '';

   if (data.type === 'payment') {
      const payment: PaymentGetResponse = await mercadopago.payment.get(data.data.id);
      const orderId: number = payment.body.external_reference;

      if (payment.body.status === 'approved') {
         await dbOrders.payOrder(orderId);
         await dbOrders.sendOrderConfirmationEmail(orderId, url);
         await dbOrders.createOptimoRouteOrder(orderId);
         await dbOrders.addReferralPoints(referralCoupon);
         await dbOrders.orderToSpreadsheet(orderId);
         await dbOrders.AddNewMailchimpOrder(orderId);
      }
   }

   return res.status(200).json({ message: 'Todo ok' });
};
