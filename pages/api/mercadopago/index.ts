import type { NextApiRequest, NextApiResponse } from 'next';

// SDK de Mercado Pago
import mercadopago from 'mercadopago';

type Data = { message: string } | any;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return getMercadoPago(req, res);

      default:
         res.status(200).json({ message: 'Example' });
   }
}

const getMercadoPago = (req: NextApiRequest, res: NextApiResponse<Data>) => {
   // Agrega credenciales
   mercadopago.configure({
      access_token: 'TEST-2684575909011712-092220-081c30fc69e0e00987f2b1f913057ebf-147648560',
   });

   // Crea un objeto de preferencia
   let preference = {
      items: [
         {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
            probamosAlgo: 'test123',
         },
      ],
   };

   mercadopago.preferences
      .create(preference)
      .then(function (response) {
         // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      })
      .catch(function (error) {
         console.log(error);
      });

   console.log(mercadopago.preferences);
   return res.status(200).json(mercadopago);
};
