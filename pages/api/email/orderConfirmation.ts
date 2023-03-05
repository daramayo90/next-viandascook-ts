import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { ICartProduct } from '../../../interfaces';
import { currency } from '../../../utils';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const {
      name,
      orderId,
      points,
      address,
      deliveryDate,
      cart,
      numberOfItems,
      subTotal,
      shipping,
      paymentMethod,
      total,
   } = req.body;

   const products = cart.map(({ name, quantity, price }: ICartProduct) => ({
      name,
      quantity,
      price: currency.format(price * quantity),
   }));

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   const msg = {
      to: {
         email: 'da.aramayo1990@gmail.com',
         name,
      },
      from: {
         email: 'info@viandascook.com',
         name: 'Viandas Cook',
      },
      templateId: 'd-22e29fae8f8b4567bb9088b1143e8807',
      dynamic_template_data: {
         subject: `¡Tu pedido #${orderId} ya está completo!`,
         name,
         orderId,
         points,
         address,
         deliveryDate: deliveryDate.split('T')[0],
         products,
         numberOfItems,
         subTotal: currency.format(Number(subTotal)),
         shipping: shipping !== 0 ? currency.format(Number(shipping)) : 'Gratis',
         paymentMethod:
            paymentMethod.toString().charAt(0).toUpperCase() + paymentMethod.toString().slice(1),
         total: currency.format(Number(total)),
      },
   };

   sgMail.send(msg);

   res.status(200).json({ message: 'Ok' });
}
