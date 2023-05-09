import type { NextApiRequest, NextApiResponse } from 'next';
import { db, dbUsers } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';

type Data = { message: string } | IUser;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return createGuest(req, res);

      default:
         res.status(400).json({ message: 'Bad request' });
   }
}

const createGuest = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const refCode = await dbUsers.generateUniqueReferralCode();

   await db.connect();

   const dbUser = await User.findOne({ email: req.cookies.email });

   if (dbUser) return res.status(200).json({ message: 'Usuario ya existe' });

   const newUser = new User({
      name: req.cookies.firstName,
      lastName: req.cookies.firstName,
      email: req.cookies.email,
      phone: '-',
      dni: '-',
      password: bcrypt.hashSync('123456', 10),
      avatar: '/avatars/VC-Avatars-00.png',
      points: 0,
      redeemPoints: 0,
      role: 'client',
      shipping: {
         address: req.cookies.address,
         address2: req.cookies.address2,
         zipcode: req.cookies.zipcode,
         city: req.cookies.city,
         city2: req.cookies.city2,
      },
      referralCode: refCode,
      coupons: [],
      resetPasswordToken: null,
      resetPasswordExpires: null,
   });

   newUser.save();

   await db.disconnect();

   return res.status(200).json(newUser);
};
