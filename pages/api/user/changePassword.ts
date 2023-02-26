import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { User } from '../../../models';
import { db } from '../../../database';
import bcrypt from 'bcryptjs';

type Data = { message: string };

interface ChangePasswordRequestBody {
   oldPassword: string;
   newPassword: string;
   repeatNewPassword: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'PATCH':
         return changePassword(req, res);

      default:
         res.status(400).json({ message: 'Bad request' });
   }
}

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
   const session = (await getSession({ req })) as any;

   if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
   }

   const { oldPassword, newPassword, repeatNewPassword }: ChangePasswordRequestBody = req.body;

   await db.connect();

   // Verify the user's old password
   const user = await User.findById(session.user._id);

   await db.disconnect();

   if (!user) {
      return res.status(400).json({ message: 'Cliente no encontrado en nuestra base de datos' });
   }

   const passwordMatch = bcrypt.compareSync(oldPassword, user.password!);

   console.log(oldPassword, user.password);

   if (!passwordMatch) {
      return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
   }

   if (newPassword !== repeatNewPassword) {
      return res.status(400).json({ message: 'La contraseña nueva no coincide' });
   }

   // Hash the new password
   const hashedPassword = bcrypt.hashSync(newPassword, 10);

   await db.connect();

   await User.updateOne(
      { email: user!.email },
      {
         $set: {
            password: hashedPassword,
         },
      },
   );

   await db.disconnect();

   res.status(200).json({ message: 'Contraseña cambiada con éxito. Redirigiendo..' });
};
