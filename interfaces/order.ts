import { ICoupon, IProduct, IProductInPack, IType, IUser } from './';

export interface IOrder {
   _id?: number;
   token?: string;
   user?: IUser | string;
   orderItems: IOrderItem[];
   shippingAddress: ShippingAddress;
   coupons?: ICoupon[];

   deliveryDate: Date;

   numberOfItems: number;
   numberOfPacks?: number;
   subTotal: number;
   discount?: number;
   shipping: number;
   couponDiscount?: number;
   referralDiscount?: number;
   pointsDiscount?: number;
   cashDiscount?: number;
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
   discountPrice?: number;
   quantity: number;
   type?: IType[];
   productsInPack?: IProductInPack[];
}

export interface ShippingAddress {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zipcode: string;
   city: ICity;
   city2?: string;
   phone: string;
   email: string;
   dni: string;
}

export type IPaymentMethods = 'efectivo' | 'transferencia' | 'mercadopago';

export type ICity = 'CABA' | 'Buenos Aires';
