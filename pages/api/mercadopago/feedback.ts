import type { NextApiRequest, NextApiResponse } from 'next';

type Data = any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getFeedback(req, res);

      default:
         return res.status(400).json({ message: 'Bad Request' });
   }
}

const getFeedback = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   res.status(200).json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
   });
};
