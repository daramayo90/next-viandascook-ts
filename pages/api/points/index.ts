import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { User } from '../../../models';
import { IUser } from '../../../interfaces';

type Data = { message: string } | IUser;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'PUT':
         return updateAddress(req, res);

      default:
         res.status(400).json({ message: 'Bad request' });
   }
}

const updateAddress = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { points, user } = req.body;

   const email = user.email as string;

   await db.connect();

   const dbUser = await User.findOne({ email }).lean();

   if (!dbUser) {
      return res.status(400).json({ message: 'No existe el usuario' });
   }

   if ((points as number) > dbUser.redeemPoints) {
      return res.status(400).json({ message: 'No tenes los puntos suficientes' });
   }

   await User.updateOne(
      { email: dbUser?.email },
      {
         $set: {
            redeemPoints: dbUser?.redeemPoints! - points,
         },
      },
   );

   await db.disconnect();

   return res.status(200).json({ message: 'Puntos canjeados correctamente' });
};
