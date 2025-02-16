import { createContext } from 'react';
import { IUser, ShippingAddress } from '../../interfaces';
import { Form } from './';

interface ContextProps {
   isLoggedIn: boolean;
   user?: IUser;
   isAuthLoaded: boolean;

   registerUser: (newUser: Form) => Promise<{ hasError: boolean; message?: string }>;
   loginUser: (email: string, password: string) => Promise<boolean>;
   logout: () => void;
   updateAddress: (info: ShippingAddress) => Promise<{ err: boolean; msg?: string }>;
}

export const AuthContext = createContext({} as ContextProps);
