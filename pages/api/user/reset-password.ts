import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'PUT':
         return resetPassword(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const resetPassword = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { token, newPassword } = req.body;

   if (!token || !newPassword) {
      return res.status(400).json({ message: 'No se recibió token o nueva contraseña' });
   }

   try {
      db.connect();
      const user = await User.findOne({
         resetPasswordToken: token,
         resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
         db.disconnect();
         return res.status(400).json({ message: 'Token inválido o expirado' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne(
         { email: user.email },
         {
            $set: {
               password: hashedPassword,
               resetPasswordToken: null,
               resetPasswordExpires: null,
            },
         },
      );
      // user.password = hashedPassword;
      // user.resetPasswordToken = null;
      // user.resetPasswordExpires = null;

      // await user.save();
      db.disconnect();

      return res.status(200).json({
         message: 'Contraseña reseteada éxitosamente. Podes volver a loguearte a continuación',
      });
   } catch (error) {
      db.disconnect();
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
   }
};
