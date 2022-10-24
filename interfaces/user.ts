import { ICoupon } from './';

export interface IUser {
   _id: string;
   name: string;
   lastName: string;
   email: string;
   phone?: string;
   dni?: string;
   password?: string;
   role: string;
   shipping: IAddress;
   coupons: ICoupon[];
   createdAt?: string;
   updatedAt?: string;
}

export interface IAddress {
   address: string;
   address2?: string;
   zipcode: string;
   city: 'caba' | 'ba';
}
