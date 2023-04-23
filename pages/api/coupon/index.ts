import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

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
   const { user }: any = (await getServerSession(req, res, authOptions)) || '';
   const { code }: any = req.query;

   if (req.cookies.coupons?.includes(code)) {
      return res.status(404).json({ message: 'Cupón ya utilizado' });
   }

   const email = user ? user.email : req.cookies.email;

   await db.connect();

   const coupon = await Coupon.findOne({ code }).lean();
   const userCoupon = await User.findOne({ email, 'coupons._id': coupon?._id }).lean();

   await db.disconnect();

   if (!coupon) return res.status(404).json({ message: 'Cupón no válido' });

   if (coupon.enabled === false || (coupon.expirationDate && coupon.expirationDate < new Date())) {
      return res.status(404).json({ message: 'Cupón expirado' });
   }

   if (coupon.allowedEmail && coupon.allowedEmail !== user.email) {
      return res.status(404).json({ message: 'Este cupón no se puede usar con el email indicado' });
   }

   const userLimit = validateCouponUssage(userCoupon!, coupon);

   if (userLimit)
      return res.status(404).json({ message: 'Tu email ya alcanzó el límite permitido' });

   res.status(200).json(coupon);
};

const validateCouponUssage = (user: IUser, coupon: ICoupon) => {
   if (!user) return null;

   if (coupon.userLimit === undefined) return null;

   return user.coupons.find(({ ussage }) => ussage >= coupon.userLimit!);
};
