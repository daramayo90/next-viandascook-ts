import { ICoupon } from './';

export interface IUser {
   _id: string;
   name: string;
   lastName: string;
   email: string;
   phone?: string;
   dni?: string;
   password?: string;
   avatar?: string;
   points: number;
   redeemPoints: number;
   role: string;
   referralCode?: string;
   shipping: IAddress;
   coupons: ICoupon[];
   resetPasswordToken?: string | undefined;
   resetPasswordExpires?: Date | undefined;
   createdAt?: string;
   updatedAt?: string;
}

export interface IAddress {
   address: string;
   address2?: string;
   zipcode: string;
   city: 'CABA' | 'Buenos Aires';
}

export interface IUserCoupon {
   _id: string;
   ussage: number;
}
