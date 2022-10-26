import { ICoupon, IUser } from './';

export interface IOrder {
   _id?: string;
   user?: IUser | string;
   orderItems: IOrderItem[];
   shippingAddress: ShippingAddress;
   coupons?: ICoupon[];

   numberOfItems: number;
   subTotal: number;
   discount?: number;
   shipping: number;
   couponDiscount?: number;
   total: number;

   isPaid: boolean;
   paidAt?: string;

   transactionId?: string;

   // paymentResult?: string;
}

export interface IOrderItem {
   _id: string;
   image: string;
   name: string;
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
