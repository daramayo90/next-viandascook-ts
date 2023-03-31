import { createContext } from 'react';
import { IOrder } from '../../interfaces';

interface ContextProps {
   prop1: boolean;

   sendOrderConfirmationEmail: (order: IOrder) => Promise<void>;
   sendWireTransferInfo: (order: IOrder) => Promise<void>;
}

export const EmailsContext = createContext({} as ContextProps);
