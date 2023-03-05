import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

type Data = {
   message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   const msg = {
      to: {
         email: 'da.aramayo1990@gmail.com',
         name: 'Damian',
      },
      from: {
         email: 'info@viandascook.com',
         name: 'Viandas Cook',
      },
      templateId: 'd-22e29fae8f8b4567bb9088b1143e8807',
      dynamic_template_data: {
         subject: '¡Tu pedido ya está completo!',
         name: 'Damián',
         orderId: 29000,
         address: 'Dr. Pedro Ignacio Rivera 4949, Depto: 302. CABA',
         deliveryDate: '23/03/2023',
         products: [
            {
               name: 'Pollo al horno con papas',
               quantity: '5',
               price: '$850,00',
            },
            {
               name: 'Matambre a la pizza con puré',
               quantity: '4',
               price: '$1,500,00',
            },
         ],
         totalQuantity: '10',
         subtotal: '$1.600',
         delivery: '$400',
         paymentMethod: 'Efectivo',
         total: '$1.920',
      },
   };

   sgMail.send(msg);

   res.status(200).json({ message: 'Ok' });
}
