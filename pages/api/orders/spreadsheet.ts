import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { currency } from '../../../utils';

// type Data = {
//    message: string;
// };

type SheetForm = {
   _id: number;
   today: string;
   email: string;
   dni: string;
   paymentMethod: string;
   total: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') {
      return res.status(405).send({ message: 'Only POST is allowed' });
   }

   const { _id, today, email, dni, paymentMethod, total } = req.body as SheetForm;

   try {
      console.log('1');
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
         range: 'A1:F1',
         valueInputOption: 'USER_ENTERED',
         requestBody: {
            values: [[_id, today, email, dni, paymentMethod, total]],
         },
      });

      return res.status(200).json({ data: response.data });
   } catch (e) {
      // console.log(e);
      return res.status(500).send({ message: 'Algo salió mal' });
   }
}
