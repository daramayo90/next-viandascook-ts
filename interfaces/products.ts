export interface IProduct {
   _id: string;
   image: string;
   name: string;
   slug: string;
   price: number;
   inStock: boolean;
   type: IType[];
   ingredients: string[];
   nutritionalInfo: object;
   howToHeat: string;
   bestSeller?: boolean;
   createdAt?: string;
   updatedAt?: string;
}

export type IType =
   | 'chicken'
   | 'dairyfree'
   | 'glutenfree'
   | 'keto'
   | 'lowcalories'
   | 'lowcarbs'
   | 'lowsodium'
   | 'meat'
   | 'pasta'
   | 'seafood'
   | 'vegan'
   | 'vegetarian';
