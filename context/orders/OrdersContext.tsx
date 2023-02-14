import { createContext } from 'react';
import { ShippingAddress } from '../../interfaces';
import { IPaymentMethods } from '../../interfaces/order';

interface ContextProps {
   shippingAddress?: ShippingAddress;

   addGuestAddress: (address: ShippingAddress) => void;
   createOrder: (paymentMethod: IPaymentMethods) => Promise<{ hasError: boolean; message: string }>;
   createMPOrder: (orderId: string) => Promise<{ id: string; error?: string }>;
   addMailchimpClient: (orderId: string) => Promise<void>;
}

export const OrdersContext = createContext({} as ContextProps);
