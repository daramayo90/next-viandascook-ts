import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { ICoupon, IUser } from '../../../interfaces';
import { Coupon, User } from '../../../models';

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

   const email = user?.email;

   await db.connect();

   const coupon = await Coupon.findOne({ code }).lean();
   const userCoupon = await User.findOne({ email, 'coupons._id': coupon?._id }).lean();

   await db.disconnect();

   if (!coupon) return res.status(404).json({ message: 'Cupón no válido' });

   if (!user) {
      return res.status(404).json({ message: 'Debes estar logueado para usar un cupón' });
   }

   if (coupon.enabled === false || (coupon.expirationDate && coupon.expirationDate < new Date())) {
      return res.status(404).json({ message: 'Cupón expirado' });
   }

   if (coupon.allowedEmail && coupon.allowedEmail !== user.email) {
      return res.status(404).json({ message: 'Este cupón no se puede usar con el email indicado' });
   }

   const userLimit = validateCouponUssage(userCoupon!, coupon);
   if (userLimit) return res.status(404).json({ message: 'Ya alcanzaste el límite permitido' });

   res.status(200).json(coupon);
};

const validateCouponUssage = (user: IUser, coupon: ICoupon) => {
   if (!user) return null;

   if (coupon.userLimit === undefined) return null;

   return user.coupons.find(({ ussage }) => ussage >= coupon.userLimit!);
};
