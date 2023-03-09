import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db, dbUsers } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';

type Data =
   | { message: string }
   | {
        token: string;
        user: {
           email: string;
           name: string;
           lastName: string;
           role: string;
        };
     };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return registerUser(req, res);

      default:
         res.status(400).json({ message: 'Bad request' });
   }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { email = '', name = '', lastName = '', password = '' } = req.body;

   console.log('test1');

   if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
   }
   console.log('test2');

   if (name.length < 2) {
      return res.status(400).json({ message: 'El nombre debe tener al menos 2 caracteres' });
   }
   console.log('test3');

   if (lastName.length < 2) {
      return res.status(400).json({ message: 'El apellido debe tener al menos 2 caracteres' });
   }
   console.log('test4');

   if (!validations.isValidEmail(email)) {
      return res.status(400).json({ message: 'No es un email válido' });
   }
   console.log('test5');

   await db.connect();
   console.log('test6');

   const user = await User.findOne({ email }).lean();
   console.log('test7');

   if (user && user.password) {
      await db.disconnect();
      return res.status(400).json({ message: 'Correo electrónico ya registrado' });
   }
   console.log('test8');

   const refCode = await dbUsers.generateUniqueReferralCode();
   console.log('test9');

   const newUser = new User({
      name: name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase(),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLocaleLowerCase(),
      email: email.toLocaleLowerCase(),
      phone: '-',
      dni: '-',
      password: bcrypt.hashSync(password, 10),
      points: 0,
      redeemPoints: 0,
      role: 'client',
      shipping: {
         address: '-',
         address2: '-',
         zipcode: '-',
         city: 'CABA',
      },
      referralCode: refCode,
      coupons: [],
   });
   console.log('test10');

   try {
      console.log('test11');
      // Guest user who already bought sometime in the past
      if (user && user.password) {
         console.log('test12');

         await User.updateOne(
            { email: user!.email },
            {
               $set: {
                  name: newUser.name,
                  lastName: newUser.lastName,
                  phone: newUser.phone,
                  dni: newUser.dni,
                  password: newUser.password,
                  points: 0,
                  redeemPoints: 0,
                  coupons: user!.coupons.length === 0 ? newUser.coupons : user!.coupons,
               },
            },
         );
      } else {
         console.log('test14');

         await newUser.save({ validateBeforeSave: true });
      }
   } catch (error) {
      console.log('test15');

      await db.disconnect();
      console.log('test16');

      console.log(error);
      console.log('test17');

      return res.status(500).json({ message: 'Error del servidor. Contactar al Admin' });
   }
   console.log('test18');

   await db.disconnect();

   const { _id, role } = newUser;

   const token = jwt.signToken(_id, email);

   return res.status(200).json({
      token,
      user: { email, role, name, lastName },
   });
};
