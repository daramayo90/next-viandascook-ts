import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

export const authOptions: NextAuthOptions = {
   providers: [
      // Custom Login
      Credentials({
         name: 'Custom Login',
         credentials: {
            email: { label: 'Mail:', type: 'email', placeholder: 'youremail@gmail.com' },
            password: { label: 'Password:', type: 'password', placeholder: 'Password' },
         },
         async authorize(credentials) {
            console.log('credentials', credentials);
            return (await dbUsers.checkUserEmailPassword(
               credentials!.email,
               credentials!.password,
            )) as any;
         },
      }),
      // Google Login
      GoogleProvider({
         clientId: process.env.GOOGLE_ID!,
         clientSecret: process.env.GOOGLE_SECRET!,
         authorization: {
            params: {
               prompt: 'consent',
               access_type: 'offline',
               response_type: 'code',
            },
         },
      }),
      FacebookProvider({
         clientId: process.env.FACEBOOK_CLIENT_ID!,
         clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      }),
   ],

   // Custom Pages
   pages: {
      signIn: '/auth/login',
      newUser: '/auth/register',
   },

   session: {
      maxAge: 5184000, // 60 days
      strategy: 'jwt',
      updateAge: 86400, // every day
   },

   // Callbacks
   callbacks: {
      async jwt({ token, account, user }) {
         if (account) {
            token.accessToken = account.access_token;
            switch (account.type) {
               case 'oauth':
                  const fullName = user?.name?.split(' ');
                  const name = fullName ? fullName[0] : '';
                  const lastName = fullName ? fullName[1] : '';
                  token.user = await dbUsers.oAuthToDbUser(user?.email || '', name, lastName);
                  break;

               case 'credentials':
                  token.user = user;
                  break;
            }
         }
         return token;
      },
      async session({ session, token, user }) {
         if (token.user) {
            const user = await dbUsers.getAddress(token.user as string);
            token.user = user;
         }

         (session as any).accessToken = token.access_token;
         session.user = token.user as any;

         return session;
      },
   },
};

export default NextAuth(authOptions);
