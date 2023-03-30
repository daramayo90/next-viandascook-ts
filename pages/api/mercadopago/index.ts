import type { NextApiRequest, NextApiResponse } from 'next';
import mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { User } from '../../../models';
import { ICartProduct } from '../../../interfaces/cart';
import { IProduct } from '../../../interfaces/products';
import { db } from '../../../database';

type Data = { message: string } | { id: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return checkoutPro(req, res);

      default:
         return res.status(400).json({ message: 'Bad Request' });
   }
}

const checkoutPro = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   console.log('1');
   mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN!,
   });
   console.log('2');

   const {
      orderItems,
      numberOfItems,
      discount = 0,
      pointsDiscount = 0,
      couponDiscount = 0,
      shipping,
      orderId,
   } = req.body;
   console.log('3');

   const { user }: any = (await getServerSession(req, res, authOptions)) || '';
   console.log('4');

   db.connect();
   console.log('5');

   const dbUser = user ? await User.findById(user._id) : null;
   console.log('6');

   db.disconnect();
   console.log('7');

   const orderUser = {
      _id: dbUser?._id || null,
      name: dbUser?.name || req.cookies.firstName,
      lastName: dbUser?.lastName || req.cookies.lastName,
      email: dbUser?.email || req.cookies.email,
      phone: dbUser?.phone || req.cookies.phone,
      dni: dbUser?.dni || req.cookies.dni,
   };
   console.log('8');

   const adjustedOrderItems = orderItems.map((product: IProduct) => {
      const price = product.price - (discount + pointsDiscount + couponDiscount) / numberOfItems;
      return { ...product, price };
   });
   console.log('9');

   const mpItems = adjustedOrderItems.map(({ _id, name, image, price, ...rest }: ICartProduct) => ({
      id: _id,
      title: name,
      picture_url: image,
      category_id: '',
      unit_price: price,
      ...rest,
   }));
   console.log('10');

   const preference: CreatePreferencePayload = {
      items: mpItems,
      payer: {
         name: orderUser.name,
         surname: orderUser.lastName,
         email: orderUser.email,
         identification: {
            type: 'DNI',
            number: orderUser.dni!,
         },
      },
      shipments: {
         cost: shipping,
      },
      back_urls: {
         success: `http://localhost:3000/muchas-gracias/${orderId}`,
         failure: 'http://localhost:3000/api/mercadopago/feedback',
         pending: 'http://localhost:3000/api/mercadopago/feedback',
      },
      auto_return: 'approved',
      statement_descriptor: 'VIANDAS COOK S.R.L',
   };
   console.log('11');

   try {
      const response: PreferenceCreateResponse = await mercadopago.preferences.create(
         preference as CreatePreferencePayload,
      );

      return res.status(200).json({ id: response.body.id });
   } catch (error) {
      return res.status(501).json({
         message: 'Estamos teniendo un error en la creación de la preferencia del backend',
      });
   }
};
