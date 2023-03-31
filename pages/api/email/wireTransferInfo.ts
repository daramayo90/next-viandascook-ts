import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { currency } from '../../../utils';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const { name, email, _id, total } = req.body;

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   const msg = {
      to: {
         email,
         name,
      },
      from: {
         email: 'info@viandascook.com',
         name: 'Viandas Cook',
      },
      subject: `#${_id} | Transferencia Bancaria`,
      text: 'Viandas Cook - Datos para la transferencia',
      html: `
        <p>Hola ${name},</p>
        <br></br>
        <p>Te dejamos a continuación los datos para la transferencia: </p>
        <p><strong>Banco:</strong> Galicia</p>
        <p><strong>CBU:</strong> 00701040-20000007169700</p>
        <p><strong>Alias:</strong> VIANDAS.COOK.SRL</p>
        <p><strong>Monto:</strong> ${currency.format(Number(total))}</p>
        <br></br>
        <p>Muchas gracias por tu compra y confiar en nosotros.</p>
      `,
   };

   sgMail.send(msg);

   res.status(200).json({ message: 'Ok' });
}
