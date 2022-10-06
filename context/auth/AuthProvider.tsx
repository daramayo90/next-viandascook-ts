import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';

import { viandasApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

interface Props {
   children: ReactNode;
}

export type Form = {
   name: string;
   lastName: string;
   email: string;
   password: string;
};

export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
   const { data, status } = useSession();

   // Persist session in the entire app when refreshing
   useEffect(() => {
      if (status === 'authenticated') {
         dispatch({ type: '[Auth] - Login', payload: data.user as IUser });
      }
   }, [data, status]);

   // Register new user
   const registerUser = async (newUser: Form): Promise<boolean> => {
      try {
         const { name, lastName, email, password } = newUser;

         const { data } = await viandasApi.post('/user/register', {
            name,
            lastName,
            email,
            password,
         });

         const { token, user } = data;

         Cookies.set('token', token);

         dispatch({ type: '[Auth] - Login', payload: user });

         return false;
      } catch (error) {
         console.log(error);

         return true;
      }
   };

   // Login user
   const loginUser = async (email: string, password: string): Promise<boolean> => {
      try {
         const { data } = await viandasApi.post('/user/login', { email, password });

         const { token, user } = data;

         Cookies.set('token', token);

         dispatch({ type: '[Auth] - Login', payload: user });

         return true;
      } catch (error) {
         console.log(error);

         return false;
      }
   };

   // Logout
   const logout = () => {
      Cookies.remove('token');
      Cookies.remove('cart');

      Cookies.remove('firstName');
      Cookies.remove('lastName');
      Cookies.remove('address');
      Cookies.remove('address2');
      Cookies.remove('zipcode');
      Cookies.remove('city');
      Cookies.remove('phone');
      Cookies.remove('email');
      Cookies.remove('dni');

      signOut();
   };

   return (
      <AuthContext.Provider value={{ ...state, registerUser, loginUser, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
