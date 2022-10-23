import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { ICoupon } from '../../../interfaces';
import { Coupon } from '../../../models';

type Data = { message: string } | ICoupon;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getCoupon(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const getCoupon = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   console.log('test');
   const { code } = req.query;

   await db.connect();

   const coupon = await Coupon.findOne({ code })
      .select('code description discount_type discount -_id')
      .lean();

   console.log(coupon);
   await db.disconnect();

   if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
   }

   res.status(200).json(coupon);
};
