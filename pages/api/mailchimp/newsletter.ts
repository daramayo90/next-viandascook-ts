import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | { error: boolean };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return subscribeUser(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const subscribeUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { name, lastName, email } = req.body;

   if (!name || !lastName || !email) {
      return res.status(400).json({ error: true, message: 'Favor de completar todos los campos' });
   }

   const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
   const API_KEY = process.env.MAILCHIMP_API_KEY;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER;

   const subscriber = {
      email_address: email.toLocaleLowerCase(),
      merge_fields: {
         FNAME: name.charAt(0).toUpperCase() + name.slice(1),
         LNAME: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      },
      status: 'subscribed',
   };

   try {
      const response = await fetch(
         `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
         {
            body: JSON.stringify(subscriber),
            headers: {
               Authorization: `apikey ${API_KEY}`,
               'Content-Type': 'application/json',
            },
            method: 'POST',
         },
      );

      if (response.status >= 400) {
         return res.status(201).json({
            error: true,
            message: 'Tu email ya está registrado en nuestro Newsletter',
         });
      }

      return res.status(201).json({ error: false });
   } catch (error) {
      return res.status(201).json({
         error: true,
         message:
            'Hubo un error del lado de nuestros servidores. Contáctanos a info@viandascook.com y te agregaremos a la antigua usanza :(',
      });
   }
};
