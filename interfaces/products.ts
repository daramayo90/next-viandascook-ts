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
   | 'Pollo'
   | 'Libre de lácteos'
   | 'Libre de glúten'
   | 'Keto'
   | 'Bajo en calorías'
   | 'Bajo en carbo'
   | 'Bajo en sodio'
   | 'Carne'
   | 'Pasta'
   | 'Pescado'
   | 'Vegano'
   | 'Vegetariano';
