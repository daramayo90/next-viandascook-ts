import { IUser } from './';

export interface IOrder {
   _id?: string;
   user?: IUser | string;
   orderItems: IOrderItem[];
   shippingAddress: ShippingAddress;
   paymentResult?: string;

   numberOfItems: number;
   subTotal: number;
   total: number;

   isPaid: boolean;
   paidAt?: string;

   transactionId?: string;
}

export interface IOrderItem {
   _id: string;
   image: string;
   name: string;
   slug: string;
   price: number;
   quantity: number;
}

export interface ShippingAddress {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zipcode: string;
   city: ICity;
   phone: string;
   email: string;
   dni: string;
}

export type ICity = 'caba' | 'ba';
