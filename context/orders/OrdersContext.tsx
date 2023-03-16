import { createContext } from 'react';
import { ShippingAddress } from '../../interfaces';
import { IPaymentMethods } from '../../interfaces/order';

interface ContextProps {
   shippingAddress?: ShippingAddress;
   orderId: number;
   paymentMethod: IPaymentMethods;

   addGuestAddress: (address: ShippingAddress) => void;
   createOrder: (paymentMethod: IPaymentMethods) => Promise<{ hasError: boolean; message: string }>;
   createMPOrder: (orderId: string) => Promise<{ id: string; error?: string }>;
   addMailchimpClient: (orderId: string) => Promise<void>;
   addReferralPoints: (referralCoupon: string) => Promise<void>;
   orderToSpreadsheet: () => Promise<void>;
}

export const OrdersContext = createContext({} as ContextProps);
