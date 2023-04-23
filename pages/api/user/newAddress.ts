import type { NextApiRequest, NextApiResponse } from 'next';

import { db, dbUsers } from '../../../database';
import { User } from '../../../models';
import { IUser } from '../../../interfaces';
import bcrypt from 'bcryptjs';

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
   const { firstName, lastName, email, address, address2, city, zipcode, phone, dni } = req.body;

   await db.connect();

   const user = await User.findOne({ email }).lean();

   await db.disconnect();

   if (!user) {
      const refCode = await dbUsers.generateUniqueReferralCode();

      await db.connect();

      const newUser = new User({
         name: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLocaleLowerCase(),
         lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLocaleLowerCase(),
         email: email.toLocaleLowerCase(),
         phone,
         dni,
         password: bcrypt.hashSync('123456', 10),
         avatar: '/avatars/VC-Avatars-00.png',
         points: 0,
         redeemPoints: 0,
         role: 'client',
         shipping: {
            address,
            address2,
            zipcode,
            city,
         },
         referralCode: refCode,
         coupons: [],
         resetPasswordToken: null,
         resetPasswordExpires: null,
      });

      await db.disconnect();

      return res.status(200).json(newUser);
   }

   await db.connect();

   await User.updateOne(
      {
         email: email,
      },
      {
         $set: {
            'shipping.address': address,
            'shipping.address2': address2,
            'shipping.city': city,
            'shipping.zipcode': zipcode,
            phone: phone,
            dni: dni,
         },
      },
   );

   await db.disconnect();

   return res.status(200).json(user);
};
