import { createContext } from 'react';
import { ShippingAddress } from '../../interfaces';

interface ContextProps {
   shippingAddress?: ShippingAddress;

   addGuestAddress: (address: ShippingAddress) => void;
}

export const OrdersContext = createContext({} as ContextProps);
