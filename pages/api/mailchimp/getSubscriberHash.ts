import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

type Data = { message: string } | { id: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getSubscriberHash(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const getSubscriberHash = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { user }: any = (await getSession({ req })) || '';

   const subscriberEmail = user ? user.email : req.cookies.email;

   const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
   const API_KEY = process.env.MAILCHIMP_API_KEY;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER;

   try {
      const { data } = await axios.get(
         `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberEmail}`,
         {
            headers: {
               Authorization: `apikey ${API_KEY}`,
               'Content-Type': 'application/json',
            },
         },
      );

      return res.status(200).json({ id: data.id });
   } catch (error) {
      return res.status(200).json({ id: '' });
   }
};
