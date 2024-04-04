import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models';
import { isEmail } from '../../../utils/validations';

type Data = {
   message: string;
   failed?: string[];
   skipped?: string[];
   updated?: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return updateCustomers(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const updateCustomers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const API_KEY = process.env.MAILCHIMP_API_KEY!;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER!;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/customers`;

   const users = await User.find().sort({ email: 1 }).lean();

   const failedCustomers: string[] = [];
   const skippedCustomers: string[] = [];

   const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

   for (const user of users) {
      const checkEmail = isEmail(user.email);

      if (checkEmail !== undefined) {
         console.log(`EMAIL NO VÁLIDO ${user.email}`, checkEmail);
         failedCustomers.push(user.email);
         continue;
      }

      console.log('todo ok');

      const customerEndpoint = `${ENDPOINT}/${user._id}`;

      try {
         // Attempt to fetch the customer from Mailchimp to see if it exists
         await axios.get(customerEndpoint, {
            headers: {
               Authorization: `Bearer ${API_KEY}`,
            },
         });

         skippedCustomers.push(user.name);
      } catch (error: any) {
         if (error.response && error.response.status === 404) {
            const customerData = {
               id: user._id.toString(),
               email_address: user.email,
               opt_in_status: true,
               first_name: user.name,
               last_name: user.lastName,
               address: {
                  address1: user.shipping.address,
                  address2: user.shipping.address2,
                  city: user.shipping.city,
                  province: 'Buenos Aires',
                  province_code: 'BA',
                  postal_code: user.shipping.zipcode,
                  country: 'Argentina',
                  country_code: 'AR',
               },
               created_at: user.createdAt,
               updated_at: user.updatedAt,
            };

            try {
               createNewCustomer(customerData, API_KEY, ENDPOINT);
            } catch (postError: any) {
               if (postError.response && postError.response.status === 429) {
                  await delay(60000);

                  createNewCustomer(customerData, API_KEY, ENDPOINT);
               } else {
                  failedCustomers.push(user.email);
               }
            }
         } else {
            failedCustomers.push(user.email);
         }
      }

      await delay(1000);
   }

   const responseMessage = {
      message: 'Sync process completed',
      ...(failedCustomers.length > 0 && { failed: failedCustomers }),
      ...(skippedCustomers.length > 0 && { skipped: skippedCustomers }),
   };

   return res.status(201).json(responseMessage);
};

const createNewCustomer = async (customerData: any, API_KEY: string, ENDPOINT: string) => {
   await axios.post(`${ENDPOINT}`, customerData, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });
};
