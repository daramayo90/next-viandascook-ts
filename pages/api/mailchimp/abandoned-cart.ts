import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Order, User } from '../../../models';
import { ICartProduct, IUser, ShippingAddress } from '../../../interfaces';
import { currency } from '../../../utils';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return addCartToMailchimp(req, res);

      case 'DELETE':
         return deleteCartToMailchimp(req, res);
      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const addCartToMailchimp = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const API_KEY = process.env.MAILCHIMP_API_KEY!;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER!;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/carts`;

   const { cart, total, email } = req.body;

   const user = await User.findOne({ email }).lean();

   const products = cart.map(({ _id, quantity, price, discountPrice }: ICartProduct) => ({
      id: _id,
      product_id: _id,
      product_variant_id: _id,
      quantity,
      price: discountPrice ? discountPrice : price,
   }));

   const abandonedCart = `${ENDPOINT}/${email}`;

   // Attempt to fetch the abandoned cart from Mailchimp to see if it exists
   try {
      await axios.get(abandonedCart, {
         headers: {
            Authorization: `Bearer ${API_KEY}`,
         },
      });

      // Cart exists, so we update it
      await axios.delete(abandonedCart, {
         headers: {
            Authorization: `Bearer ${API_KEY}`,
         },
      });

      await addNewCartToMailchimp(email, user, total, products, ENDPOINT, API_KEY);
   } catch (error: any) {
      // Cart does not exist, so we create it
      if (error.response && error.response.status === 404) {
         try {
            await addNewCartToMailchimp(email, user, total, products, ENDPOINT, API_KEY);
         } catch (error) {
            return res.status(500).json({ message: 'Error adding cart to Mailchimp' });
         }
      }
   }

   return res.status(201).json({ message: 'Cart sync process completed' });
};

const addNewCartToMailchimp = async (
   email: string,
   user: IUser | null,
   total: string,
   products: any,
   ENDPOINT: string,
   API_KEY: string,
) => {
   const cartData = {
      id: email,
      customer: {
         id: email,
         email_address: email,
         opt_in_status: true,
         first_name: user ? user.name : '',
         last_name: user ? user.lastName : '',
      },
      currency_code: 'ARS',
      order_total: total,
      lines: products,
      checkout_url: 'https://viandascook.com/cart',
   };

   await axios.post(ENDPOINT, cartData, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });
};

const deleteCartToMailchimp = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const API_KEY = process.env.MAILCHIMP_API_KEY!;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER!;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/carts`;

   const { email } = req.body;

   const abandonedCart = `${ENDPOINT}/${email}`;

   try {
      await axios.delete(abandonedCart, {
         headers: {
            Authorization: `Bearer ${API_KEY}`,
         },
      });
   } catch (error) {
      return res.status(500).json({ message: 'Error deleting cart from Mailchimp' });
   }

   return res.status(201).json({ message: 'Cart deleted successfully' });
};
