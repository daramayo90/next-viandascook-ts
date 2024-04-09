import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Order } from '../../../models';
import { IUser, ShippingAddress } from '../../../interfaces';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return addCartToMailchimp(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const addCartToMailchimp = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { products, total } = req.body;

   const API_KEY = process.env.MAILCHIMP_API_KEY!;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER!;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/carts`;

   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

   return res.status(201).json({ message: 'Cart sync process completed' });
};
