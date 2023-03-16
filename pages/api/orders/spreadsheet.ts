import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { db } from '../../../database';
import { User } from '../../../models';
import { currency } from '../../../utils';

// type Data = {
//    message: string;
// };

type SheetForm = {
   user: any;
   orderId: string;
   today: string;
   address: string;
   address2: string;
   city: string;
   paymentMethod: string;
   total: number;
   deliveryDate: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') {
      return res.status(405).send({ message: 'Only POST is allowed' });
   }

   const { user, orderId, today, address, address2, city, paymentMethod, total, deliveryDate } =
      req.body as SheetForm;

   const id = user ? user._id : null;

   await db.connect();

   const dbUser = await User.findById(id);

   await db.disconnect();

   const orderUser = {
      name: dbUser?.name || req.cookies.firstName,
      lastName: dbUser?.lastName || req.cookies.lastName,
      email: dbUser?.email || req.cookies.email,
      phone: dbUser?.phone || req.cookies.phone,
      dni: dbUser?.dni || req.cookies.dni,
   };

   const { name, lastName, email, phone, dni } = orderUser;

   try {
      const auth = new google.auth.GoogleAuth({
         credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL!,
            private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
         },
         scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets',
         ],
      });

      const sheets = google.sheets({
         auth,
         version: 'v4',
      });

      const response = await sheets.spreadsheets.values.append({
         spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
         range: 'A1:O1',
         valueInputOption: 'USER_ENTERED',
         requestBody: {
            values: [
               [
                  orderId,
                  today,
                  name,
                  lastName,
                  email,
                  phone,
                  dni,
                  `${address}, ${city}`,
                  `${address}, Depto/Casa: ${address2}`,
                  `${paymentMethod}: ${currency.format(total)}`,
                  '',
                  deliveryDate,
               ],
            ],
         },
      });

      return res.status(200).json({ data: response.data });
   } catch (e) {
      // console.log(e);
      return res.status(500).send({ message: 'Algo salió mal' });
   }
}
