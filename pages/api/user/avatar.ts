import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { db } from '../../../database';
import { User } from '../../../models';

type Data = { message: string } | { avatar: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'PUT':
         return addAvatar(req, res);

      default:
         res.status(400).json({ message: 'Bad request' });
   }
}

const addAvatar = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { user }: any = (await getServerSession(req, res, authOptions)) || '';
   const { avatar } = req.body;

   await db.connect();

   const dbUser = await User.findById(user._id).lean();

   if (!dbUser) {
      await db.disconnect();
      return res.status(400).json({ message: 'No existe el usuario' });
   }

   await User.updateOne(
      { _id: dbUser._id },
      {
         $set: {
            avatar,
         },
      },
      { upsert: true, setDefaultsOnInsert: false },
   );

   await db.disconnect();

   return res.status(200).json({ avatar: dbUser.avatar! });
};
