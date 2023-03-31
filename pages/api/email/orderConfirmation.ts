import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { ICartProduct } from '../../../interfaces';
import { currency } from '../../../utils';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const {
      orderId,
      name,
      toEmail,
      address,
      deliveryDate,
      cart,
      numberOfItems,
      subTotal,
      discount,
      couponDiscount,
      referralDiscount,
      pointsDiscount,
      shipping,
      paymentMethod,
      total,
   } = req.body;

   const [year, month, dayToSplit] = deliveryDate.toString().split('-');
   const [day] = dayToSplit.split('T');

   const products = cart.map(({ image, name, quantity, price }: ICartProduct) => ({
      image,
      name,
      quantity,
      price: currency.format(price * quantity),
   }));

   const discounts = discount + couponDiscount + referralDiscount + pointsDiscount;

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   const msg = {
      to: {
         email: toEmail,
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
         points: Math.round(total - shipping),
         address,
         deliveryDate: `${day}/${month}/${year}`,
         products,
         numberOfItems,
         subTotal: currency.format(Number(subTotal)),
         discounts: currency.format(Number(discounts)),
         shipping: shipping !== 0 ? currency.format(Number(shipping)) : 'Gratis',
         paymentMethod:
            paymentMethod.toString().charAt(0).toUpperCase() + paymentMethod.toString().slice(1),
         total: currency.format(Number(total)),
         orderLink: `${req.headers.origin}/pedidos/${orderId}`,
      },
   };

   console.log(msg);

   sgMail.send(msg);

   res.status(200).json({ message: 'Ok' });
}
