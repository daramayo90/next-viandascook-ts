import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
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
   isAuthLoaded: boolean;
}

const AUTH_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined,
   isAuthLoaded: false,
};

export const AuthProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
   const { data, status } = useSession();

   // ---------------------------------------------
   // Helper: Sync shipping info to cookies if needed
   // ---------------------------------------------
   const syncShippingCookies = (shipping: any) => {
      // Compare each field in cookies vs. shipping from the session
      const cookieAddress = Cookies.get('address') || '';
      const cookieCity = Cookies.get('city') || '';
      const cookieZip = Cookies.get('zipcode') || '';
      const cookieCity2 = Cookies.get('city2') || '';

      // If they differ in any way, update cookies & shipping cost
      const needsSync =
         cookieAddress !== shipping.address ||
         cookieCity !== shipping.city ||
         cookieZip !== shipping.zipcode ||
         cookieCity2 !== (shipping.city2 || '');

      if (needsSync) {
         Cookies.set('address', shipping.address);
         Cookies.set('city', shipping.city);
         Cookies.set('zipcode', shipping.zipcode);
         Cookies.set('city2', shipping.city2 || '');
      }
   };

   // ---------------------------------------------
   // On session load, update auth context & cookies
   // ---------------------------------------------
   useEffect(() => {
      if (status === 'loading') return;

      if (status !== 'authenticated') {
         return dispatch({ type: '[Auth] - AuthLoaded' });
      }

      const user = data?.user as IUser;
      if (!user) return;

      syncShippingCookies(user.shipping);

      dispatch({ type: '[Auth] - Login', payload: user });
      dispatch({ type: '[Auth] - AuthLoaded' });
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

         dispatch({ type: '[Auth] - New Address', payload: data });

         return {
            err: false,
         };
      } catch (error: any) {
         console.log(error);
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
