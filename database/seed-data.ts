import { IType } from '../interfaces';

interface SeedProduct {
   image: string;
   name: string;
   price: number;
   inStock: boolean;
   type: IType;
   ingredients: string[];
   nutritionalInfo: object[];
   howToHeat: string;
}

interface SeedData {
   products: SeedProduct[];
}

export const initialData: SeedData = {
   products: [
      {
         image: '1740176-00-A_0_2000.jpg',
         name: 'Plato 1',
         price: 75,
         inStock: true,
         type: 'vegan',
         ingredients: ['Ají morrón rojo', 'Berenjena'],
         nutritionalInfo: [{ Proteína: '17g' }, { Sodio: '75mg' }],
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: '1740176-00-A_0_2000.jpg',
         name: 'Plato 2',
         price: 75,
         inStock: true,
         type: 'meat',
         ingredients: ['Ají morrón rojo', 'Berenjena'],
         nutritionalInfo: [{ Proteína: '17g' }, { Sodio: '75mg' }],
         howToHeat: 'Descripción de cómo calentar',
      },
   ],
};
