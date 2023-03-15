import bcrypt from 'bcryptjs';
import { IAddress, ICouponTypes, IUserCoupon, IType } from '../interfaces';

interface SeedProduct {
   image: string;
   name: string;
   slug: string;
   price: number;
   inStock: boolean;
   type: IType;
   ingredients: string[];
   nutritionalInfo: object;
   howToHeat: string;
   bestSeller?: boolean;
}

interface SeedUser {
   name: string;
   lastName: string;
   email: string;
   phone?: string;
   dni?: string;
   password?: string;
   points: number;
   redeemPoints: number;
   role: string;
   referralCode?: string;
   shipping: IAddress;
   coupons: IUserCoupon[];
}

interface SeedCoupon {
   code: string;
   description: string;
   discount_type: ICouponTypes;
   discount: number;
   enabled: boolean;
   minAmount?: number;
   maxAmount?: number;
   allowedEmail?: string;
   userLimit?: number;
   ussage: number;
   expirationDate?: Date;
}

interface SeedData {
   coupons: SeedCoupon[];
   users: SeedUser[];
   products: SeedProduct[];
}

export const initialData: SeedData = {
   coupons: [
      {
         code: 'bienvenido10',
         description: 'Primera compra - 10%',
         discount_type: 'percentage discount',
         discount: 10,
         enabled: true,
         userLimit: 1,
         ussage: 0,
      },
      {
         code: 'nico-pm',
         description: 'Descuento del 50% por ayudarme con la web',
         discount_type: 'fixed discount',
         discount: 6000,
         enabled: true,
         minAmount: 12000,
         maxAmount: 25000,
         allowedEmail: 'damian@gmail.com',
         ussage: 0,
      },
      {
         code: 'cyber-viandas',
         description: 'Descuento del 20% del Cyber Monday',
         discount_type: 'percentage discount',
         discount: 20,
         enabled: true,
         ussage: 0,
      },
   ],

   users: [
      {
         name: 'Damian',
         lastName: 'Aramayo',
         email: 'damian@gmail.com',
         phone: '1136527688',
         dni: '38987745',
         password: bcrypt.hashSync('123456', 10),
         role: 'admin',
         points: 0,
         redeemPoints: 0,
         shipping: {
            address: 'Baker Street',
            address2: '221B',
            zipcode: '7933',
            city: 'CABA',
         },
         referralCode: 'ref-vc1000',
         coupons: [],
      },
      {
         name: 'Norma',
         lastName: 'Henscheid',
         email: 'norma@gmail.com',
         phone: '1152469988',
         dni: '20706485',
         password: bcrypt.hashSync('123456', 10),
         role: 'client',
         points: 0,
         redeemPoints: 0,
         shipping: {
            address: 'P Sherman',
            address2: 'Depto: 4A',
            zipcode: '4563',
            city: 'Buenos Aires',
         },
         coupons: [],
      },
   ],

   products: [],
};
