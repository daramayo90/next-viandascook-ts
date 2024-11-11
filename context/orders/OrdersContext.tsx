import { createContext } from 'react';
import { ShippingAddress } from '../../interfaces';
import { IOrder, IPaymentMethods } from '../../interfaces/order';

interface ContextProps {
   shippingAddress?: ShippingAddress;
   orderId: number;
   // paymentMethod: IPaymentMethods;

   addGuestAddress: (address: ShippingAddress) => void;

   createOrder: (
      paymentMethod: IPaymentMethods,
   ) => Promise<{ hasError: boolean; message: string; token?: string }>;

   createMPOrder: (
      orderId: string,
      token: string,
   ) => Promise<{ id: string; init_point: string; error?: string }>;

   addMailchimpClient: (orderId: string) => Promise<void>;
   addReferralPoints: (referralCoupon: string) => Promise<void>;
   orderToSpreadsheet: (order: IOrder) => Promise<void>;
   orderToOptimoRoute: (order: IOrder) => Promise<void>;
}

export const OrdersContext = createContext({} as ContextProps);
