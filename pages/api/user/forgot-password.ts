import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const { email } = req.body;

   db.connect();
   const user = await User.findOne({ email });
   db.disconnect();

   if (!user) {
      return res.status(404).json({ message: 'No existe un usuario con este mail' });
   }

   // Generate the token and set its expiration date (1 hour from now)
   const resetPasswordToken = generateToken();
   const resetPasswordExpires = new Date(Date.now() + 3600000);

   db.connect();
   await User.updateOne(
      { email: user.email },
      {
         $set: {
            resetPasswordToken,
            resetPasswordExpires,
         },
      },
   );
   db.disconnect();

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   const resetLink = `${req.headers.origin}/auth/resetear-clave?token=${resetPasswordToken}`;

   const msg = {
      to: {
         email,
      },
      from: {
         email: 'info@viandascook.com',
         name: 'Viandas Cook',
      },
      subject: 'Restablecimiento de clave',
      text: 'Viandas Cook - Restablecer Contraseña',
      html: `
      <p>Solicitaste restablecer tu contraseña en Viandas Cook. Hacé click en el siguiente enlace para restablecer tu contraseña:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Si no solicitaste un restablecimiento de contraseña, podes ignorar este correo electrónico.</p>
      `,
   };

   sgMail.send(msg);

   return res.status(200).json({
      message: 'Se ha enviado un email a tu casilla de correo para restablecer la contraseña',
   });
}

const generateToken = () => {
   return crypto.randomBytes(32).toString('hex');
};
