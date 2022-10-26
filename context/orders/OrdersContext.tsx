import { createContext } from 'react';
import { ShippingAddress } from '../../interfaces';

interface ContextProps {
   shippingAddress?: ShippingAddress;

   addGuestAddress: (address: ShippingAddress) => void;
   createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const OrdersContext = createContext({} as ContextProps);
