import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files } from 'formidable';
import { readExcelFile } from '../../../utils/readExcel';
import { db, dbUsers } from '../../../database';
import { User } from '../../../models';

type Data = { message: string };

export const config = {
   api: {
      bodyParser: false,
   },
};

const uploadFromExcel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const form = new IncomingForm({ keepExtensions: true });

   form.parse(req, async (err, fields: Fields, files: Files) => {
      if (err) {
         res.status(400).json({ message: 'Error processing file' });
         return;
      }

      const file = files.file;

      // Check if the file is an array or a single file
      const filePath = Array.isArray(file) ? file[0].filepath : file.filepath;
      const usersData = await readExcelFile(filePath);

      const users = usersData.map((u: any) => {
         return {
            name: u.name.charAt(0).toUpperCase() + u.name.slice(1).toLocaleLowerCase(),
            lastName: u.lastName.charAt(0).toUpperCase() + u.lastName.slice(1).toLocaleLowerCase(),
            email: u.email.toLocaleLowerCase(),
            phone: u.phone,
            dni: u.dni,
            password: u.password,
            avatar: u.avatar,
            points: u.points,
            redeemPoints: u.redeemPoints,
            referralCode: u.referralCode,
            role: u.role,
            shipping: {
               address: u.address,
               address2: u.address2,
               zipcode: u.zipcode,
               city: u.city,
            },
            coupons: [
               {
                  _id: '63fbc962834cfafbd6ea3236',
                  code: 'bienvenido10',
                  ussage: 1,
               },
            ],
            resetPasswordExpires: u.resetPasswordExpires,
            resetPasswordToken: u.resetPasswordToken,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
            __v: u.__v,
         };
      });

      try {
         db.connect();
         await User.insertMany(users);
         db.disconnect();
         res.status(201).json({ message: 'Usuarios importados correctamente' });
      } catch (error) {
         db.disconnect();
         console.log(error);
         res.status(400).json({ message: 'Error importando usuarios' });
      }
   });
};

const handler = nextConnect<Data>();

handler.post(uploadFromExcel);

export default handler;
