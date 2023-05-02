import { IType } from '.';

export interface ICartProduct {
   _id: string;
   image: string;
   name: string;
   // slug: string;
   price: number;
   discountPrice?: number;
   type?: IType[];
   quantity: number;
}
