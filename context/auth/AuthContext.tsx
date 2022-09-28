import { createContext } from 'react';
import { IUser } from '../../interfaces';
import { Form } from './';

interface ContextProps {
   isLoggedIn: boolean;
   user?: IUser;
   registerUser: (newUser: Form) => Promise<boolean>;
   loginUser: (email: string, password: string) => Promise<boolean>;
   logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
