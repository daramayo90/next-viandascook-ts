import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { User } from '../../../models';
import { IUser } from '../../../interfaces';
import { getSession } from 'next-auth/react';

type Data = { message: string } | IUser;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'PUT':
         return addCoupon(req, res);

      default:
         res.status(400).json({ message: 'Bad request' });
   }
}

const addCoupon = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { user }: any = (await getSession({ req })) || '';

   // const { email, address, address2, city, zipcode, phone, dni } = req.body;

   await db.connect();

   const dbUser = await User.findById(user._id).lean();

   if (!dbUser) {
      return res.status(400).json({ message: 'No existe el usuario' });
   }

   // TODO: Ver cuando el usuario es guest
   const dbUssage = dbUser.coupons.find((c) => c.code === req.body.code)?.ussage || 0;

   await User.updateOne(
      { email: dbUser?.email },
      {
         $set: {
            coupons: {
               _id: req.body._id,
               code: req.body.code,
               ussage: dbUssage + 1,
            },
         },
      },
      { upsert: true, setDefaultsOnInsert: false },
   );

   await db.disconnect();

   return res.status(200).json(user);
};
