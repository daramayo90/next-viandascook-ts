import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
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
   const { user }: any = (await getSession({ req })) || '';
   const { code } = req.query;

   await db.connect();

   const coupon = await Coupon.findOne({ code }).select(' -_id -__v -createdAt -updatedAt').lean();

   await db.disconnect();

   if (!coupon) return res.status(404).json({ message: 'Cupón no válido' });

   if (coupon.enabled === false) return res.status(404).json({ message: 'Cupón expirado' });

   if (coupon.expirationDate && coupon.expirationDate < new Date())
      return res.status(404).json({ message: 'Cupón expirado' });

   if (coupon.allowedEmail) {
      if (coupon.allowedEmail !== user?.email) {
         return res
            .status(404)
            .json({ message: 'Este cupón no se puede usar con el email indicado' });
      }
   }

   res.status(200).json(coupon);
};
