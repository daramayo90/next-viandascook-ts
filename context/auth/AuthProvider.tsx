import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';

import Cookies from 'js-cookie';

import { viandasApi } from '../../axiosApi';
import { IUser, ShippingAddress } from '../../interfaces';
import { AuthContext, authReducer } from './';

interface Props {
   children: ReactNode;
}

// TODO: Remover este Form
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
   const registerUser = async (newUser: Form): Promise<{ hasError: boolean; message?: string }> => {
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

         return {
            hasError: false,
         };
      } catch (error: any) {
         return {
            hasError: true,
            message: error.response.data.message,
         };
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
      Cookies.remove('cart-middleware');
      Cookies.remove('shipping');
      Cookies.remove('coupons');
      localStorage.removeItem('cart');

      signOut();
   };

   // Update address of userdb
   const updateAddress = async (info: ShippingAddress): Promise<{ err: boolean; msg?: string }> => {
      try {
         const { email, address, address2 = '', city, city2 = '', zipcode, phone, dni } = info;

         const { data } = await viandasApi.put('/user/newAddress', {
            email,
            address,
            address2,
            city,
            city2,
            zipcode,
            phone,
            dni,
         });

         const { user } = data;

         dispatch({ type: '[Auth] - New Address', payload: user });

         return {
            err: false,
         };
      } catch (error: any) {
         return {
            err: true,
            msg: error.response.data.message,
         };
      }
   };

   return (
      <AuthContext.Provider value={{ ...state, registerUser, loginUser, logout, updateAddress }}>
         {children}
      </AuthContext.Provider>
   );
};
