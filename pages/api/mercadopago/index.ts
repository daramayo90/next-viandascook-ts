import type { NextApiRequest, NextApiResponse } from 'next';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { User } from '../../../models';
import { ICartProduct } from '../../../interfaces/cart';
import { IProduct } from '../../../interfaces/products';
import { db } from '../../../database';
import mercadopago from 'mercadopago';

type Data = { message: string } | { id: string; init_point: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return checkoutPro(req, res);

      default:
         return res.status(400).json({ message: 'Bad Request' });
   }
}

const checkoutPro = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN!,
   });

   const {
      orderItems,
      numberOfItems,
      discount = 0,
      pointsDiscount = 0,
      couponDiscount = 0,
      shipping,
      orderId,
      token,
   } = req.body;

   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

   await db.connect();
   const dbUser = user ? await User.findById(user._id) : null;
   await db.disconnect();

   const orderUser = {
      _id: dbUser?._id || null,
      name: dbUser?.name || req.cookies.firstName,
      lastName: dbUser?.lastName || req.cookies.lastName,
      email: dbUser?.email || req.cookies.email,
      phone: dbUser?.phone || req.cookies.phone,
      dni: dbUser?.dni || req.cookies.dni,
   };

   const adjustedOrderItems = orderItems.map((product: IProduct) => {
      const basePrice =
         product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;

      const price = basePrice - (discount + pointsDiscount + couponDiscount) / numberOfItems;

      return { ...product, price };
   });

   const mpItems = adjustedOrderItems.map(({ _id, name, image, price, ...rest }: ICartProduct) => ({
      id: _id,
      title: name,
      picture_url: image,
      category_id: '',
      unit_price: price,
      ...rest,
   }));

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
      external_reference: orderId,
      back_urls: {
         success: `${req.headers.origin}/muchas-gracias/${orderId}/?viandasToken=${token}`,
         failure: `${req.headers.origin}/checkout`,
         pending: `${req.headers.origin}/checkout`,
      },
      notification_url: `${req.headers.origin}/api/mercadopago/webhooks`,
      auto_return: 'all',
      statement_descriptor: 'VIANDAS COOK S.R.L',
   };

   try {
      const response: PreferenceCreateResponse = await mercadopago.preferences.create(
         preference as CreatePreferencePayload,
      );

      return res.status(200).json({ id: response.body.id, init_point: response.body.init_point });
   } catch (error) {
      return res.status(501).json({
         message: 'Error en el servidor al crear la preferencia',
      });
   }
};
