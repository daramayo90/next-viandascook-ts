export interface ICoupon {
   _id: string;
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

   createdAt?: string;
   updatedAt?: string;
}

export type ICouponTypes = 'percentage discount' | 'fixed discount';
