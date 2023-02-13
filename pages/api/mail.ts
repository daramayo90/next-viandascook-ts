import type { NextApiRequest, NextApiResponse } from 'next';
import mail from '@sendgrid/mail';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   mail.setApiKey(process.env.SENDGRID_API_KEY!);

   const body = JSON.parse(req.body);

   const message = `
   Name: ${body.name}\r\n
   Email: ${body.email}
   `;

   const data = {
      to: 'da.aramayo1990@gmail.com',
      from: 'info@viandascook.com',
      subject: 'New web form message!',
      text: message,
      html: message.replace(/\r\n/g, '<br>'),
   };

   try {
      await mail.send(data);
      console.log('todo ok');
   } catch (error) {
      console.log(error);
   }

   res.status(200).json({ message: 'Ok' });
}
