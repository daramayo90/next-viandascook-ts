import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import { db } from '../../../database';
import { ICoupon } from '../../../interfaces';

import { User } from '../../../models';

type Data = { message: string } | ICoupon;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return validateCoupon(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const validateCoupon = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { user }: any = (await unstable_getServerSession(req, res, authOptions)) || '';
   const { code }: any = req.query;

   await db.connect();

   const userdb = await User.findOne({ email: user!.email });
   const referralCode = await User.findOne({ referralCode: code });

   await db.disconnect();

   if (!userdb) {
      return res.status(404).json({ message: 'No existe el cliente' });
   }

   if (!referralCode) {
      return res.status(404).json({ message: 'Este cupón de referidos no existe' });
   }

   if (code === userdb.referralCode) {
      return res.status(404).json({ message: 'No podés utilizar tu propio cupón' });
   }

   res.status(200).json({ message: `Cupón ${code} aplicado correctamente` });
};
