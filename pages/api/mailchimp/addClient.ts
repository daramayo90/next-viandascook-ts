import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return addClient(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const addClient = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { subs, orderId, total, cart } = req.body;
   const { email, name, lastName } = subs;

   const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
   const API_KEY = process.env.MAILCHIMP_API_KEY;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER;

   const data = JSON.stringify({
      email_address: email.toLocaleLowerCase(),
      merge_fields: {
         FNAME: name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase(),
         LNAME: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLocaleLowerCase(),
         //  BIRTHDAY: '01/22',
      },
      status: 'subscribed',
   });

   const config = {
      method: 'post',
      url: `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      headers: {
         Authorization: `apikey ${API_KEY}`,
         'Content-Type': 'application/json',
      },
      data,
   };

   axios(config)
      .then(function (response) {
         return res.status(201).json({ message: response.data.id });
      })
      .catch(function (error) {
         return res.status(201).json({ message: 'Error' });
      });
};
