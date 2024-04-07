import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { User } from '../../../models';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return addNewMailchmpCustomer(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const addNewMailchmpCustomer = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

   const API_KEY = process.env.MAILCHIMP_API_KEY!;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER!;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/customers`;

   const email = user ? user.email : req.cookies.email;

   const userDb = await User.findOne({ email }).lean();

   if (!userDb) {
      return res.status(404).json({ message: 'User not found' });
   }

   const customerEndpoint = `${ENDPOINT}/${userDb._id}`;

   // Attempt to fetch the customer from Mailchimp to see if it exists
   try {
      await axios.get(customerEndpoint, {
         headers: {
            Authorization: `Bearer ${API_KEY}`,
         },
      });
   } catch (error: any) {
      if (error.response && error.response.status === 404) {
         const customerData = {
            id: userDb._id.toString(),
            email_address: userDb.email,
            opt_in_status: true,
            first_name: userDb.name,
            last_name: userDb.lastName,
            address: {
               address1: userDb.shipping.address,
               address2: userDb.shipping.address2,
               city: userDb.shipping.city,
               province: 'Buenos Aires',
               province_code: 'BA',
               postal_code: userDb.shipping.zipcode,
               country: 'Argentina',
               country_code: 'AR',
            },
            created_at: userDb.createdAt,
            updated_at: userDb.updatedAt,
         };

         try {
            await axios.post(`${ENDPOINT}`, customerData, {
               headers: {
                  Authorization: `Bearer ${API_KEY}`,
               },
            });
         } catch (postError: any) {
            return res.status(500).json({ message: postError.response.data.message });
         }
      }
   }

   return res.status(201).json({ message: 'Customer added successfully' });
};
