import { ICoupon } from '../interfaces';

export const calc = (coupon: ICoupon, subTotal: number): number => {
   const { discount, discount_type } = coupon;

   const amount = calculate(discount, discount_type, subTotal);

   return amount;
};

const calculate = (discount: number, type: string, subTotal: number): number => {
   if (type === 'percentage discount') {
      return (subTotal * discount) / 100;
   }

   if (type === 'fixed discount') {
      return discount;
   }

   return 0;
};
