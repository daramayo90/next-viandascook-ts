import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models';

type Data = {
   message: string;
   failed?: string[];
   skipped?: string[];
   updated?: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return updateProducts(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const updateProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const API_KEY = process.env.MAILCHIMP_API_KEY;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/products`;

   const products = await Product.find().sort({ name: 1 }).lean();

   const failedProducts: string[] = [];
   const skippedProducts: string[] = [];
   const updatedProducts: string[] = [];

   const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

   for (const product of products) {
      const productEndpoint = `${ENDPOINT}/${product._id}`;

      try {
         // Fetch the product from Mailchimp to see if it exists and to compare prices
         const { data } = await axios.get(productEndpoint, {
            headers: {
               Authorization: `Bearer ${API_KEY}`,
            },
         });

         // Assuming response contains product details including variants and their prices
         const mailchimpProductPrice = data.variants[0].price;

         // If price is different, update the product in Mailchimp
         if (mailchimpProductPrice !== product.price) {
            await axios.patch(
               productEndpoint,
               {
                  variants: [
                     {
                        id: product._id.toString(),
                        price: product.price,
                     },
                  ],
               },
               {
                  headers: {
                     Authorization: `Bearer ${API_KEY}`,
                  },
               },
            );
            updatedProducts.push(product.name);
         } else {
            skippedProducts.push(product.name);
         }
      } catch (error: any) {
         // Create the product in Mailchimp if it doesn't exist
         if (error.response && error.response.status === 404) {
            const productData = {
               id: product._id.toString(),
               title: product.name,
               variants: [
                  {
                     id: product._id.toString(),
                     title: product.name,
                     url: `https://viandascook.com/plato/${product.slug}`,
                     sku: product.slug,
                     price: product.price,
                     image_url: product.image,
                  },
               ],
               url: `https://viandascook.com/plato/${product.slug}`,
               description: product.description,
               image_url: product.image,
            };

            try {
               await axios.post(`${ENDPOINT}`, productData, {
                  headers: {
                     Authorization: `Bearer ${API_KEY}`,
                  },
               });
            } catch (postError: any) {
               if (postError.response && postError.response.status === 429) {
                  // Hit the rate limit, wait for 1 minute and try again
                  await delay(60000); // Delay for 1 minute
                  // Attempt to post again after waiting
                  await axios.post(`${ENDPOINT}`, productData, {
                     headers: {
                        Authorization: `Bearer ${API_KEY}`,
                     },
                  });
               } else {
                  failedProducts.push(product.name);
               }
            }
         } else {
            failedProducts.push(product.name);
         }
      }

      await delay(1000);
   }

   const responseMessage = {
      message: 'Sync process completed',
      ...(failedProducts.length > 0 && { failed: failedProducts }),
      ...(skippedProducts.length > 0 && { skipped: skippedProducts }),
      ...(updatedProducts.length > 0 && { updated: updatedProducts }),
   };

   return res.status(201).json(responseMessage);
};
