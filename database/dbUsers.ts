import { isValidObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

import { db } from '.';
import { User } from '../models';
import { IUser } from '../interfaces';

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
// TODO: Ver new user
export const oAuthToDbUser = async (authEmail: string, authName: string, authLastName: string) => {
   await db.connect();

   const user = await User.findOne({ email: authEmail });

   if (user) {
      await db.disconnect();
      const { _id, name, lastName, email, phone = '', dni = '', shipping, role } = user;
      return { _id, name, lastName, email, phone, dni, shipping, role };
   }

   const newUser = new User({
      name: authName,
      lastName: authLastName,
      email: authEmail,
      password: '@',
      role: 'client',
   });

   await newUser.save();

   await db.disconnect();

   const { _id, name, lastName, email, role } = newUser;

   return { _id, name, lastName, email, role };
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
