import type { NextApiRequest, NextApiResponse } from 'next';
import mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { User } from '../../../models';
import { ICartProduct } from '../../../interfaces/cart';
import { IProduct } from '../../../interfaces/products';

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
   // const body: IOrder = {
   //    orderItems: cart.map((product) => product),
   //    coupons,
   //    shippingAddress,
   //    deliveryDate: deliveryDateSelected,
   //    numberOfItems,
   //    subTotal,
   //    discount,
   //    shipping,
   //    couponDiscount,
   //    pointsDiscount,
   //    total,
   //    isPaid: false,
   // };

   // const { items } = req.body;

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
   } = req.body;

   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

   const id = user ? user._id : null;

   const dbUser = await User.findById(id);

   const orderUser = {
      _id: id || null,
      name: dbUser?.name || req.cookies.firstName,
      lastName: dbUser?.lastName || req.cookies.lastName,
      email: dbUser?.email || req.cookies.email,
      phone: dbUser?.phone || req.cookies.phone,
      dni: dbUser?.dni || req.cookies.dni,
   };

   orderItems.forEach((p: IProduct) => {
      return (p.price = p.price - (discount + pointsDiscount + couponDiscount) / numberOfItems);
   });

   const mpItems = (orderItems as ICartProduct[]).map(
      ({
         _id: id,
         name: title,
         image: picture_url,
         type: category_id,
         price: unit_price,
         ...rest
      }) => ({
         id,
         title,
         picture_url,
         category_id: '',
         unit_price,
         ...rest,
      }),
   );

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
         // free_shipping: shipping === 0 ? true : false,
      },
      //    phone: {
      //       area_code: '11',
      //       number: '4444-4444',
      //    },
      //    identification: {
      //       type: 'DNI',
      //       number: orderUser.dni!,
      //    },
      // },
      // shipments: {
      //    receiver_address: {
      //       zip_code: shippingAddress.zipcode,
      //       street_name: shippingAddress.address,
      //       apartment: shippingAddress.address2,
      //       city_name: shippingAddress.city,
      //       state_name: 'null',
      //    },
      // },
      back_urls: {
         success: `http://localhost:3000/muchas-gracias/${orderId}`,
         failure: 'http://localhost:3000/api/mercadopago/feedback',
         pending: 'http://localhost:3000/api/mercadopago/feedback',
      },
      auto_return: 'approved',
      statement_descriptor: 'VIANDAS COOK S.R.L',
   };

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
