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

   db.connect();

   const user: IUser = await User.findOne({ referralCode: referralCoupon }).lean();

   db.disconnect();

   if (!user) return res.status(400).json({ message: 'Usuario no existe' });

   db.connect();

   await User.updateOne(
      { email: user.email },
      {
         $set: {
            points: user.points + 10000,
            redeemPoints: user.points + 10000,
         },
      },
   );

   db.disconnect();

   return res.status(200).json({ message: 'Se aplicaron los puntos correctamente' });
};
