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
   const { email, address, address2, city, zipcode, phone, dni } = req.body;

   await db.connect();
   console.log(email);
   let user;
   try {
      user = await User.findOne({ email: email });
      console.log(user);
   } catch (error) {
      console.log('ERROR', error);
      db.disconnect();
   }

   console.log('Busqué al usuario');
   console.log('El usuario es ', user);

   if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
   }
   console.log('Encontré al usuario');

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

   console.log('Update de la base de datos');

   await db.disconnect();

   console.log('Me desconecté');

   console.log('user', user);
   return res.status(200).json({ message: 'process performed' });
};
