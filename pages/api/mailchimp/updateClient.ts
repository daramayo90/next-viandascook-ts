import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'PATCH':
         return addClient(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const addClient = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { id, orderId, total, cart } = req.body;
   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

   const subscriber = {
      name: user ? user.name : req.cookies.name,
      lastName: user ? user.lastName : req.cookies.lastName,
      email: user ? user.email : req.cookies.email,
   };

   const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
   const API_KEY = process.env.MAILCHIMP_API_KEY;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER;

   const data = {
      email_address: subscriber.email.toLocaleLowerCase(),
      merge_fields: {
         FNAME: subscriber.name.charAt(0).toUpperCase() + subscriber.name.slice(1),
         LNAME: subscriber.lastName.charAt(0).toUpperCase() + subscriber.lastName.slice(1),
      },
      status: 'subscribed',
   };

   try {
      const { data } = await axios.patch(
         `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
         {
            email_address: subscriber.email.toLocaleLowerCase(),
            //  status: 'subscribed',
            merge_fields: {
               FNAME: subscriber.name.charAt(0).toUpperCase() + subscriber.name.slice(1),
               LNAME: subscriber.lastName.charAt(0).toUpperCase() + subscriber.lastName.slice(1),
               ORDERID: orderId,
               TOTAL: total,
               ITEMS: cart,
            },
            headers: {
               Authorization: `apikey ${API_KEY}`,
               'Content-Type': 'application/json',
            },
         },
      );

      return;
      // return res.status(201).json({ error: false });
   } catch (error) {
      return;
      // return res.status(201).json({
      //    error: true,
      //    message:
      //       'Hubo un error del lado de nuestros servidores. Contáctanos a info@viandascook.com y te agregaremos a la antigua usanza :(',
      // });
   }
};
