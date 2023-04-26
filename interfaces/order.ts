import { ICoupon, IUser } from './';

export interface IOrder {
   _id?: number;
   token?: string;
   user?: IUser | string;
   orderItems: IOrderItem[];
   shippingAddress: ShippingAddress;
   coupons?: ICoupon[];

   deliveryDate: Date;

   numberOfItems: number;
   subTotal: number;
   discount?: number;
   shipping: number;
   couponDiscount?: number;
   referralDiscount?: number;
   pointsDiscount?: number;
   total: number;

   paymentMethod: IPaymentMethods;
   isPaid: boolean;
   paidAt?: string;

   isCancel?: boolean;

   transactionId?: string;

   createdAt?: Date;
   updatedAt?: Date;

   // paymentResult?: string;
}

export interface IOrderItem {
   _id: string;
   image: string;
   name: string;
   // slug: string;
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

export type IPaymentMethods = 'efectivo' | 'transferencia' | 'mercadopago';

export type ICity = 'CABA' | 'Buenos Aires';
