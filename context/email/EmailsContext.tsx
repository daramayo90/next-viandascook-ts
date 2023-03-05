import { createContext } from 'react';

interface ContextProps {
   prop1: boolean;

   sendOrderConfirmationEmail: () => Promise<void>;
}

export const EmailsContext = createContext({} as ContextProps);
