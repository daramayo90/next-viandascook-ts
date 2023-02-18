import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
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

   if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
   }

   if (name.length < 2) {
      return res.status(400).json({ message: 'El nombre debe tener al menos 2 caracteres' });
   }

   if (lastName.length < 2) {
      return res.status(400).json({ message: 'El apellido debe tener al menos 2 caracteres' });
   }

   if (!validations.isValidEmail(email)) {
      return res.status(400).json({ message: 'No es un email válido' });
   }

   await db.connect();

   const user = await User.findOne({ email }).lean();

   if (user && user.password) {
      await db.disconnect();
      return res.status(400).json({ message: 'Correo electrónico ya registrado' });
   }

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
      coupons: [],
   });

   try {
      // Guest user who already bought sometime in the past
      if (user && user.password) {
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
         await newUser.save({ validateBeforeSave: true });
      }
   } catch (error) {
      await db.disconnect();
      console.log(error);
      return res.status(500).json({ message: 'Error del servidor. Contactar al Admin' });
   }

   await db.disconnect();

   const { _id, role } = newUser;

   const token = jwt.signToken(_id, email);

   return res.status(200).json({
      token,
      user: { email, role, name, lastName },
   });
};
