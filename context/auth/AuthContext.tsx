import { createContext } from 'react';
import { IUser, ShippingAddress } from '../../interfaces';
import { Form } from './';

interface ContextProps {
   isLoggedIn: boolean;
   user?: IUser;

   registerUser: (newUser: Form) => Promise<{ hasError: boolean; message?: string }>;
   loginUser: (email: string, password: string) => Promise<boolean>;
   logout: () => void;
   updateAddress: (address: ShippingAddress) => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps);
