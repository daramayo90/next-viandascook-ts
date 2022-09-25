import { IType } from '../interfaces';

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
}

interface SeedData {
   products: SeedProduct[];
}

export const initialData: SeedData = {
   products: [
      {
         image: 'albondigas-con-vegetales.jpg',
         name: 'Albondigas con vegetales',
         slug: 'albondigas-con-vegetales',
         price: 850,
         inStock: true,
         type: 'meat',
         ingredients: [
            'Ají morrón rojo',
            'Berenjena',
            'Brocoli',
            'Carne picada',
            'Choclo',
            'Cebolla',
            'Salsa de tomate',
            'Zanahoria',
            'Zapallito',
            'Zucchini',
         ],
         nutritionalInfo: {
            Calorías: '410 kcal',
            Proteína: '4,8 g',
            Colesterol: '21 g',
            Fibras: '7,4 g',
            Sodio: '134 mg',
            Carbohidratos: '8,4 g',
            Grasas: '1,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'bife-a-la-criolla-con-verduras.jpg',
         name: 'Bife a la criolla con verduras',
         slug: 'bife-a-la-criolla-con-verduras',
         price: 900,
         inStock: true,
         type: 'meat',
         ingredients: [
            'Aceite',
            'Ají morrón rojo',
            'Arvejas',
            'Berenjena',
            'Bife',
            'Cebolla',
            'Salsa de tomate',
            'Zanahoria',
            'Zapallito',
            'Zucchini',
         ],
         nutritionalInfo: {
            Calorías: '410 kcal',
            Proteína: '4,8 g',
            Colesterol: '21 g',
            Fibras: '7,4 g',
            Sodio: '134 mg',
            Carbohidratos: '8,4 g',
            Grasas: '1,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'bondiola-con-croquetas-de-arroz.jpg',
         name: 'Bondiola con croquetas de arroz',
         slug: 'bondiola-con-croquetas-de-arroz',
         price: 900,
         inStock: true,
         type: 'meat',
         ingredients: ['Aceite', 'Arroz', 'Bondiola', 'Harina', 'Huevo', 'Jamón', 'Leche'],
         nutritionalInfo: {
            Calorías: '410 kcal',
            Proteína: '4,8 g',
            Colesterol: '21 g',
            Fibras: '7,4 g',
            Sodio: '134 mg',
            Carbohidratos: '8,4 g',
            Grasas: '1,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'bondiola-con-pure-de-zapallo.jpg',
         name: 'Bondiola con puré de zapallo',
         slug: 'bondiola-con-pure-de-zapallo',
         price: 900,
         inStock: true,
         type: 'meat',
         ingredients: ['Aceite de girasol', 'Bondiola', 'Leche', 'Zapallo'],
         nutritionalInfo: {
            Calorías: '410 kcal',
            Proteína: '4,8 g',
            Colesterol: '21 g',
            Fibras: '7,4 g',
            Sodio: '134 mg',
            Carbohidratos: '8,4 g',
            Grasas: '1,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'bowl-de-garbanzo-salteado-con-vegetales.jpg',
         name: 'Bowl de garbanzo salteado con vegetales',
         slug: 'bowl-de-garbanzo-salteado-con-vegetales',
         price: 700,
         inStock: true,
         type: 'meat',
         ingredients: [
            'Ají morrón rojo',
            'Berenjena',
            'Brocoli',
            'Cebolla',
            'Garbanzo',
            'Zanahoria',
            'Zapallito',
            'Zucchini',
         ],
         nutritionalInfo: {
            Calorías: '410 kcal',
            Proteína: '4,8 g',
            Colesterol: '21 g',
            Fibras: '7,4 g',
            Sodio: '134 mg',
            Carbohidratos: '8,4 g',
            Grasas: '1,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'canelones-de-acelga-y-ricota-con-salsa.jpg',
         name: 'Canelones de acelga y ricota con salsa',
         slug: 'canelones-de-acelga-y-ricota-con-salsa',
         price: 750,
         inStock: true,
         type: 'meat',
         ingredients: ['Harina', 'Huevo', 'Leche', 'Ricota', 'Salsa de tomate'],
         nutritionalInfo: {
            Calorías: '410 kcal',
            Proteína: '4,8 g',
            Colesterol: '21 g',
            Fibras: '7,4 g',
            Sodio: '134 mg',
            Carbohidratos: '8,4 g',
            Grasas: '1,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'canelones-de-verdura-con-salsa-blanca.jpg',
         name: 'Canelones de verdura con salsa blanca',
         slug: 'canelones-de-verdura-con-salsa-blanca',
         price: 750,
         inStock: true,
         type: 'meat',
         ingredients: [
            'Acelga',
            'Ají morrón rojo',
            'Cebolla',
            'Harina',
            'Huevo',
            'Leche',
            'Manteca',
            'Ricota',
         ],
         nutritionalInfo: {
            Calorías: '410 kcal',
            Proteína: '4,8 g',
            Colesterol: '21 g',
            Fibras: '7,4 g',
            Sodio: '134 mg',
            Carbohidratos: '8,4 g',
            Grasas: '1,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
   ],
};
