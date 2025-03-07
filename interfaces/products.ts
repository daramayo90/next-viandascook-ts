export interface IProductInPack {
   product: IProduct;
   quantity: number;
}

export interface IProduct {
   _id: string;
   image: string;
   name: string;
   slug: string;
   price: number;
   discountPrice?: number;
   inStock: boolean;
   type: IType[];
   ingredients: string[];
   nutritionalInfo: object;
   howToHeat: string;
   description?: string;
   bestSeller?: boolean;
   createdAt?: string;
   updatedAt?: string;
   productsInPack?: IProductInPack[];
}

export type IType =
   | 'Bajo en calorías'
   | 'Bajo en carbo'
   | 'Bajo en sodio'
   | 'Carne'
   | 'Empanada'
   | 'Wrap'
   | 'Keto'
   | 'Libre de glúten'
   | 'Libre de lácteos'
   | 'Pasta'
   | 'Pescado'
   | 'Pollo'
   | 'Tarta'
   | 'Vegano'
   | 'Vegetariano'
   | 'Waffles'
   | 'Budines'
   | 'Packs';
