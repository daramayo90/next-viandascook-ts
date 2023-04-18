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
   console.log('1');

   db.connect();
   console.log('2');

   const user = await User.findOne({ email });
   console.log('3');

   db.disconnect();
   console.log('4');

   if (!user) {
      return res.status(404).json({ message: 'No existe un usuario con este mail' });
   }
   console.log('5');

   // Generate the token and set its expiration date (1 hour from now)
   const resetPasswordToken = generateToken();
   const resetPasswordExpires = new Date(Date.now() + 3600000);
   console.log('6');

   db.connect();
   console.log('7');

   await User.updateOne(
      { email: user.email },
      {
         $set: {
            resetPasswordToken,
            resetPasswordExpires,
         },
      },
   );
   console.log('8');

   db.disconnect();
   console.log('9');

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   console.log('10');

   const resetLink = `${req.headers.origin}/auth/resetear-clave?token=${resetPasswordToken}`;
   console.log('11');

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
   console.log('12');

   await sgMail.send(msg);
   console.log('13');

   return res.status(200).json({
      message: 'Se ha enviado un email a tu casilla de correo para restablecer la contraseña',
   });
}

const generateToken = () => {
   return crypto.randomBytes(32).toString('hex');
};
