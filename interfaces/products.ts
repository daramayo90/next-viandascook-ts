export interface IProduct {
   _id: string;
   image: string;
   name: string;
   price: number;
   inStock: boolean;
   type: IType;
   ingredients: string[];
   nutritionalInfo: object[];
   howToHeat: string;
   createdAt: string;
   updatedAt: string;
}

export type IType =
   | 'dairyfree'
   | 'glutenfree'
   | 'keto'
   | 'lowcalories'
   | 'lowcarbs'
   | 'lowsodium'
   | 'meat'
   | 'poultry'
   | 'seafood'
   | 'vegan'
   | 'vegetarian';
