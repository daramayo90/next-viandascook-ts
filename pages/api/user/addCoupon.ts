import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import { db } from '../../../database';
import { User } from '../../../models';
import { IUser } from '../../../interfaces';

type Data = { message: string } | IUser;

interface IUserCoupon {
   _id: string;
   code: string;
   ussage: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'PUT':
         return addCoupon(req, res);

      default:
         res.status(400).json({ message: 'Bad request' });
   }
}

const addCoupon = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

   const { _id, code } = req.body;

   const id = user ? user._id : null;

   await db.connect();

   const dbUser = await User.findById(id).lean();

   // if (!dbUser) {
   //    return res.status(400).json({ message: 'No existe el usuario' });
   // }

   // TODO: Ver cuando el usuario es guest
   const dbUssage = dbUser?.coupons.find((c: IUserCoupon) => c.code === code)?.ussage || 0;

   await User.updateOne(
      { email: dbUser?.email || req.cookies.email },
      {
         $set: {
            name: dbUser?.name || req.cookies.firstName,
            lastName: dbUser?.lastName || req.cookies.lastName,
            shipping: {
               address: dbUser?.shipping.address || req.cookies.address,
               address2: dbUser?.shipping.address2 || req.cookies.address2,
               zipcode: dbUser?.shipping.zipcode || req.cookies.zipcode,
               city: dbUser?.shipping.city || req.cookies.city,
               city2: dbUser?.shipping.city2 || req.cookies.city2,
            },
            coupons: {
               _id: _id,
               code: code,
               ussage: dbUssage + 1,
            },
            role: 'client',
         },
      },
      { upsert: true, setDefaultsOnInsert: false },
   );

   await db.disconnect();

   return res.status(200).json(user);
};
