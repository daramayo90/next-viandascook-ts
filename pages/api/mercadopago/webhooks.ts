import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
   message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return mpWebhooks(req, res);

      default:
         return res.status(400).json({ message: 'Bad Request' });
   }
}

const mpWebhooks = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   return res.status(200).json({ message: 'Todo ok' });
};
