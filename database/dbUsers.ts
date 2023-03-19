import { isValidObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

import { db } from '.';
import { User } from '../models';
import { IUser } from '../interfaces';
import crypto from 'crypto';

export const checkUserEmailPassword = async (email: string, password: string) => {
   await db.connect();

   const user = await User.findOne({ email });

   await db.disconnect();

   if (!user) return null;

   if (!bcrypt.compareSync(password, user.password!)) return null;

   const { _id, name, lastName, phone = '', dni = '', shipping, role } = user;

   // TODO: Acá se pasaría a number los numbers?
   return {
      _id,
      name,
      lastName,
      email: email.toLocaleLowerCase(),
      phone,
      dni,
      shipping,
      role,
   };
};

// This function craeates or verifies an OAuth user
export const oAuthToDbUser = async (authEmail: string, authName: string, authLastName: string) => {
   await db.connect();

   const user = await User.findOne({ email: authEmail });

   if (user) {
      await db.disconnect();
      const { _id, name, lastName, email, phone = '', dni = '', shipping, role } = user;
      return { _id, name, lastName, email, phone, dni, shipping, role };
   }

   const refCode = await generateUniqueReferralCode();

   const newUser = new User({
      name: authName,
      lastName: authLastName,
      email: authEmail,
      phone: '-',
      dni: '-',
      password: '-',
      avatar: '/avatars/VC-Avatars-00.png',
      points: 0,
      redeemPoints: 0,
      role: 'client',
      shipping: {
         address: '-',
         address2: '-',
         zipcode: '-',
         city: 'CABA',
      },
      referralCode: refCode,
      coupons: [],
      resetPasswordToken: null,
      resetPasswordExpires: null,
   });

   await newUser.save();

   await db.disconnect();

   const { _id, name, lastName, email, phone = '', dni = '', shipping, role } = newUser;

   return { _id, name, lastName, email, phone, dni, shipping, role };
};

export const getUser = async (email: string): Promise<IUser | null> => {
   await db.connect();

   const user = await User.findOne({ email });

   await db.disconnect();

   if (!user) return null;

   return JSON.parse(JSON.stringify(user));
};

export const getAddress = async (user: string): Promise<IUser | null> => {
   const { _id } = user as any;

   if (!isValidObjectId(_id)) return null;

   await db.connect();

   const userdb = await User.findById(_id).lean();

   await db.disconnect();

   if (!userdb) return null;

   return JSON.parse(JSON.stringify(userdb));
};

export const generateUniqueReferralCode = async (): Promise<string> => {
   const prefix = 'vc';

   while (true) {
      const randomNumber = crypto.randomInt(100, 999);

      const randomLetters = crypto.randomBytes(2).toString('hex').toLowerCase();

      const code = `${prefix}-${randomLetters}-${randomNumber}`;

      await db.connect();

      const existingUser = await User.findOne({ referralCode: code });

      await db.disconnect();

      if (!existingUser) {
         return code;
      }
   }
};
