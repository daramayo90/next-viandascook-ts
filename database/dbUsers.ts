import bcrypt from 'bcryptjs';

import { db } from '.';
import { User } from '../models';

export const checkUserEmailPassword = async (email: string, password: string) => {
   await db.connect();

   const user = await User.findOne({ email });

   await db.disconnect();

   if (!user) return null;
   if (!bcrypt.compareSync(password, user.password!)) return null;

   const { _id, name, lastName, role } = user;

   return {
      _id,
      name,
      lastName,
      email: email.toLocaleLowerCase(),
      role,
   };
};

// This function craeates or verifies an OAuth user
export const oAuthToDbUser = async (authEmail: string, authName: string, authLastName: string) => {
   await db.connect();

   const user = await User.findOne({ email: authEmail });

   if (user) {
      await db.disconnect();
      const { _id, name, lastName, email, role } = user;
      return { _id, name, lastName, email, role };
   }

   const newUser = new User({
      email: authEmail,
      name: authName,
      lastName: authLastName,
      password: '@',
      role: 'client',
   });

   await newUser.save();

   await db.disconnect();

   const { _id, name, lastName, email, role } = newUser;

   return { _id, name, lastName, email, role };
};
