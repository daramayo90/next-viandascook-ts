import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = {
   message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'PATCH':
         return addReferralPoints(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const addReferralPoints = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { referralCoupon } = req.body;

   await db.connect();

   const user: IUser | null = await User.findOne({ referralCode: referralCoupon }).lean();

   await db.disconnect();

   if (!user) return res.status(400).json({ message: 'Usuario no existe' });

   await db.connect();

   await User.updateOne(
      { email: user.email },
      {
         $set: {
            points: user.points + 10000,
            redeemPoints: user.points + 10000,
         },
      },
   );

   await db.disconnect();

   return res.status(200).json({ message: 'Se aplicaron los puntos correctamente' });
};
