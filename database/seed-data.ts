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

   products: [
      {
         image: 'agnolotis-de-ricota-y-jamon.jpg',
         name: 'Agnolotis de ricota y jamón',
         slug: 'agnolotis-de-ricota-y-jamon',
         price: 850,
         inStock: true,
         type: 'meat',
         bestSeller: true,
         ingredients: ['Agnolotis', 'Jamón', 'Ricota', 'Salsa de tomate'],
         nutritionalInfo: {
            Calorías: '281 kcal',
            Proteína: '12 g',
            Colesterol: '21 g',
            Fibras: '1,5 g',
            Sodio: '779 mg',
            Carbohidratos: '43,1 g',
            Grasas: '5 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'albondigas-con-salsa-y-arroz.jpg',
         name: 'Albóndigas con salsa y arroz',
         slug: 'albondigas-con-salsa-y-arroz',
         price: 850,
         inStock: true,
         type: 'meat',
         ingredients: ['Ají morrón rojo', 'Arroz', 'Carne picada', 'Cebolla', 'Salsa de tomate'],
         nutritionalInfo: {
            Calorías: '582 kcal',
            Proteína: '33,6 g',
            Colesterol: ' g',
            Fibras: '2 g',
            Sodio: '390,4 mg',
            Carbohidratos: '75,4 g',
            Grasas: '7,5 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'albondigas-con-vegetales.jpg',
         name: 'Albóndigas con vegetales',
         slug: 'albondigas-con-vegetales',
         price: 850,
         inStock: true,
         type: 'meat',
         ingredients: [
            'Ají morrón rojo',
            'Berenjena',
            'Brócoli',
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
         image: 'arroz-yamani-con-pollo-y-verduras-salteadas.jpg',
         name: 'Arroz yamaní con pollo y verduras salteadas',
         slug: 'arroz-yamani-con-pollo-y-verduras-salteadas',
         price: 750,
         inStock: true,
         type: 'chicken',
         bestSeller: true,
         ingredients: [
            'Ají morrón rojo',
            'Arroz yamaní',
            'Berenjena',
            'Cebolla',
            'Pollo',
            'Zanahoria',
            'Zapallito',
            'Zucchini',
         ],
         nutritionalInfo: {
            Calorías: '377 kcal',
            Proteína: '18,6 g',
            Colesterol: ' g',
            Fibras: '4,6g',
            Sodio: '19 mg',
            Carbohidratos: '52,6 g',
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
            'Arveja',
            'Berenjena',
            'Bife',
            'Cebolla',
            'Salsa de tomate',
            'Zanahoria',
            'Zapallito',
            'Zucchini',
         ],
         nutritionalInfo: {
            Calorías: '453 kcal',
            Proteína: '35,5 g',
            Fibras: '3,4 g',
            Sodio: '373 mg',
            Carbohidratos: '19,4 g',
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
         bestSeller: true,
         ingredients: ['Aceite', 'Arroz', 'Bondiola', 'Harina', 'Huevo', 'Jamón', 'Leche'],
         nutritionalInfo: {
            Calorías: '939 kcal',
            Proteína: '34,5 g',
            Colesterol: ' g',
            Fibras: '0,0 g',
            Sodio: '354,8 mg',
            Carbohidratos: '27,8 g',
            Grasas: '18,8 g',
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
         ingredients: ['Aceite de grirasol', 'Bondiola', 'Leche', 'Zapallo'],
         nutritionalInfo: {
            Calorías: '576 kcal',
            Proteína: '27,8 g',
            Colesterol: ' g',
            Fibras: '2,2 g',
            Sodio: '114 mg',
            Carbohidratos: '24,7 g',
            Grasas: '12,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'bowl-de-garbanzos-salteado-con-vegetales.jpg',
         name: 'Bowl de garbanzos salteado con vegetales',
         slug: 'bowl-de-garbanzos-salteado-con-vegetales',
         price: 700,
         inStock: true,
         type: 'vegan',
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
            Calorías: '113 kcal',
            Proteína: '7,5 g',
            Colesterol: ' g',
            Fibras: '6,5 g',
            Sodio: '145,4 mg',
            Carbohidratos: '24,5 g',
            Grasas: '0,0 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'canelones-de-pollo-y-ricota-magra.jpg',
         name: 'Canelones de pollo y ricota magra',
         slug: 'canelones-de-pollo-y-ricota-magra',
         price: 600,
         inStock: true,
         type: 'pasta',
         bestSeller: true,
         ingredients: [
            'Ají morrón rojo',
            'Avena',
            'Cebolla',
            'Huevo',
            'Leche',
            'Pechuga',
            'Ricota',
            'Salsa de tomate',
         ],
         nutritionalInfo: {
            Calorías: '467 kcal',
            Proteína: '32,9 g',
            Colesterol: ' g',
            Fibras: '6,8 g',
            Sodio: '438 mg',
            Carbohidratos: '50,6 g',
            Grasas: '7,2 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'canelones-de-acelga-y-ricota-con-salsa-de-tomate.jpg',
         name: 'Canelones de acelga y ricota con salsa de tomate',
         slug: 'canelones-de-acelga-y-ricota-con-salsa-de-tomate',
         price: 750,
         inStock: true,
         type: 'pasta',
         ingredients: ['Harina', 'Huevo', 'Leche', 'Ricota', 'Salsa de tomate'],
         nutritionalInfo: {
            Calorías: '581 kcal',
            Proteína: '30,8 g',
            Colesterol: ' g',
            Fibras: '1,2 g',
            Sodio: '430 mg',
            Carbohidratos: '45,8 g',
            Grasas: '15,6 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'canelones-de-verdura-con-salsa-blanca.jpg',
         name: 'Canelones de verdura con salsa blanca',
         slug: 'canelones-de-verdura-con-salsa-blanca',
         price: 750,
         inStock: true,
         type: 'pasta',
         bestSeller: true,
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
            Calorías: '416 kcal',
            Proteína: '19,4 g',
            Colesterol: ' g',
            Fibras: '5,2 g',
            Sodio: '490 mg',
            Carbohidratos: '50,7 g',
            Grasas: '10,1 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'colita-de-cuadril-con-papas-al-horno.jpg',
         name: 'Colita de cuadril con papas al horno',
         slug: 'colita-de-cuadril-con-papas-al-horno',
         price: 950,
         inStock: true,
         type: 'meat',
         ingredients: ['Ají morrón rojo', 'Cebolla', 'Cuadril', 'Papa', 'Salsa de tomate'],
         nutritionalInfo: {
            Calorías: '483 kcal',
            Proteína: '48,7 g',
            Colesterol: ' g',
            Fibras: '5,9 g',
            Sodio: '887,1 mg',
            Carbohidratos: '52 g',
            Grasas: '4 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'crepes-de-verdura-y-atun.jpg',
         name: 'Crepés de verdura y atún',
         slug: 'crepes-de-verdura-y-atun',
         price: 750,
         inStock: true,
         type: 'seafood',
         ingredients: [
            'Acelga',
            'Ají morrón rojo',
            'Atún',
            'Cebolla',
            'Harina',
            'Huevo',
            'Leche',
            'Salsa de tomate',
         ],
         nutritionalInfo: {
            Calorías: '293 kcal',
            Proteína: '24,1 g',
            Colesterol: ' g',
            Fibras: '3,8 g',
            Sodio: '605,2 mg',
            Carbohidratos: '38,2 g',
            Grasas: '3,5 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'fideos-con-brocoli-y-salsa-blanca.jpg',
         name: 'Fideos con brócoli y salsa blanca',
         slug: 'fideos-con-brocoli-y-salsa-blanca',
         price: 750,
         inStock: true,
         type: 'pasta',
         bestSeller: true,
         ingredients: [
            'Brocoli',
            'Fideos integrales',
            'Harina',
            'Leche',
            'Manteca',
            'Nuez moscada',
         ],
         nutritionalInfo: {
            Calorías: '522 kcal',
            Proteína: '15,7 g',
            Colesterol: ' g',
            Fibras: '0,9 g',
            Sodio: '52,9 mg',
            Carbohidratos: '84,9 g',
            Grasas: '5,6 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'fideos-integrales-con-cubos-de-pollo-y-salsa.jpg',
         name: 'Fideos integrales con cubos de pollo y salsa',
         slug: 'fideos-integrales-con-cubos-de-pollo-y-salsa',
         price: 750,
         inStock: true,
         type: 'pasta',
         ingredients: [
            'Ají morrón rojo',
            'Cebolla',
            'Fideos integrales',
            'Pechuga',
            'Salsa de tomate',
         ],
         nutritionalInfo: {
            Calorías: '417 kcal',
            Proteína: '27 g',
            Colesterol: ' g',
            Fibras: '2 g',
            Sodio: '396,4 mg',
            Carbohidratos: '71,6 g',
            Grasas: '0,0 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'filet-de-merluza-con-pure-de-calabaza.jpg',
         name: 'Filet de merluza con puré de calabaza',
         slug: 'filet-de-merluza-con-pure-de-calabaza',
         price: 850,
         inStock: true,
         type: 'seafood',
         ingredients: ['Calabaza', 'Huevo', 'Leche', 'Manteca', 'Merluza', 'Pan rallado'],
         nutritionalInfo: {
            Calorías: '439 kcal',
            Proteína: '41,3 g',
            Colesterol: ' g',
            Fibras: '5 g',
            Sodio: '168 mg',
            Carbohidratos: '32,3 g',
            Grasas: '7,4 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'filet-de-merluza-rebozado-con-salvado-de-avena-y-batata.jpg',
         name: 'Filet de merluza rebozado con salvado de avena y batata',
         slug: 'filet-de-merluza-rebozado-con-salvado-de-avena-y-batata',
         price: 850,
         inStock: true,
         type: 'seafood',
         ingredients: ['Batata', 'Huevo', 'Merluza', 'Salvado de avena'],
         nutritionalInfo: {
            Calorías: '406 kcal',
            Proteína: '39,7 g',
            Colesterol: ' g',
            Fibras: '4,5 g',
            Sodio: '40,2 mg',
            Carbohidratos: '60,8 g',
            Grasas: '1,0 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'filet-de-merluza-rebozado-con-salvado-de-avena-y-vegetales.jpg',
         name: 'Filet de merluza rebozado con salvado de avena y vegetales',
         slug: 'filet-de-merluza-rebozado-con-salvado-de-avena-y-vegetales',
         price: 850,
         inStock: true,
         type: 'seafood',
         bestSeller: true,
         ingredients: [
            'Ají morrón rojo',
            'Berenjena',
            'Cebolla',
            'Huevo',
            'Merluza',
            'Salvado de avena',
            'Zanahoria',
            'Zapallito',
            'Zucchini',
         ],
         nutritionalInfo: {
            Calorías: '300 kcal',
            Proteína: '40,4 g',
            Colesterol: ' g',
            Fibras: '9,1 g',
            Sodio: '47,1 mg',
            Carbohidratos: '43 g',
            Grasas: '1,0 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'guiso-de-lentejas-vegano.jpg',
         name: 'Guiso de lentejas vegano',
         slug: 'guiso-de-lentejas-vegano',
         price: 700,
         inStock: true,
         type: 'vegan',
         ingredients: [
            'Arroz',
            'Ají morrón rojo',
            'Berenjena',
            'Cebolla',
            'Lenteja',
            'Papa',
            'Salsa de tomate',
            'Zanahoria',
            'Zapallito',
            'Zucchini',
         ],
         nutritionalInfo: {
            Calorías: '477 kcal',
            Proteína: '20,5 g',
            Colesterol: ' g',
            Fibras: '18,3 g',
            Sodio: '575 mg',
            Carbohidratos: '73,9 g',
            Grasas: '0,0 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'hamburguesas-con-papas-bravas-al-horno.jpg',
         name: 'Hamburguesas con papas bravas al horno',
         slug: 'hamburguesas-con-papas-bravas-al-horno',
         price: 950,
         inStock: true,
         type: 'meat',
         ingredients: ['Ají morrón rojo', 'Carne picada', 'Cebolla', 'Papa', 'Pimentón'],
         nutritionalInfo: {
            Calorías: '564 kcal',
            Proteína: '40,7 g',
            Colesterol: 'g',
            Fibras: '5,9 g',
            Sodio: '779,1 mg',
            Carbohidratos: '53,8 g',
            Grasas: '10,0 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'hamburguesas-de-garbanzos-con-papas.jpg',
         name: 'Hamburguesas de garbanzos con papas',
         slug: 'hamburguesas-de-garbanzos-con-papas',
         price: 750,
         inStock: true,
         type: 'vegetarian',
         bestSeller: true,
         ingredients: [
            'Aceite',
            'Ají morrón rojo',
            'Cebolla',
            'Grabanzo',
            'Huevo',
            'Pan rallado',
            'Papa',
         ],
         nutritionalInfo: {
            Calorías: '569 kcal',
            Proteína: '18 g',
            Colesterol: ' g',
            Fibras: '11,2 g',
            Sodio: '633,7 mg',
            Carbohidratos: '75,9 g',
            Grasas: '3,6 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'hamburguesas-de-lentejas-con-calabazas.jpg',
         name: 'Hamburguesas de lentejas con calabazas',
         slug: 'hamburguesas-de-lentejas-con-calabazas',
         price: 750,
         inStock: true,
         type: 'vegetarian',
         ingredients: [
            'Aceite',
            'Ají morrón rojo',
            'Calabaza',
            'Cebolla',
            'Huevo',
            'Lenteja',
            'Pan rallado',
         ],
         nutritionalInfo: {
            Calorías: '502 kcal',
            Proteína: '17,2 g',
            Colesterol: ' g',
            Fibras: '11,7 g',
            Sodio: '98,2 mg',
            Carbohidratos: '50,1 g',
            Grasas: '3,6 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'hamburguesas-de-pollo-con-pure-de-calabaza.jpg',
         name: 'Hamburguesas de pollo con puré de calabaza',
         slug: 'hamburguesas-de-pollo-con-pure-de-calabaza',
         price: 750,
         inStock: true,
         type: 'chicken',
         ingredients: ['Ají morrón rojo', 'Calabaza', 'Leche', 'Manteca', 'Pechuga'],
         nutritionalInfo: {
            Calorías: '63 kcal',
            Proteína: '4,8 g',
            Colesterol: ' g',
            Fibras: '4,4 g',
            Sodio: '22,7 mg',
            Carbohidratos: '17,1 g',
            Grasas: '0,0 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'lasagna-de-carne-y-queso.jpg',
         name: 'Lasagna de carne y queso',
         slug: 'lasagna-de-carne-y-queso',
         price: 950,
         inStock: true,
         type: 'pasta',
         bestSeller: true,
         ingredients: [
            'Ají morrón rojo',
            'Carne picada',
            'Choclo',
            'Cebolla',
            'Harina',
            'Huevo',
            'Leche',
            'Manteca',
            'Salsa de tomate',
         ],
         nutritionalInfo: {
            Calorías: '789 kcal',
            Proteína: '51,7 g',
            Colesterol: ' g',
            Fibras: '2,2 g',
            Sodio: '467,8 mg',
            Carbohidratos: '38 g',
            Grasas: '24,3 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'lasagna-rellena-de-vegetales.jpg',
         name: 'Lasagna rellena de vegetales',
         slug: 'lasagna-rellena-de-vegetales',
         price: 700,
         inStock: true,
         type: 'meat',
         ingredients: [
            'Ají morrón rojo',
            'Berenjena',
            'Cebolla',
            'Leche',
            'Manteca',
            'Nuez moscada',
            'Salsa de tomate',
            'Zanahoria',
            'Zapallito',
            'Zucchini',
         ],
         nutritionalInfo: {
            Calorías: '304 kcal',
            Proteína: '8,9 g',
            Colesterol: ' g',
            Fibras: '4 g',
            Sodio: '332,1 mg',
            Carbohidratos: '52,7 g',
            Grasas: '5,6 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'matambre-a-la-pizza-con-pure-de-papa.jpg',
         name: 'Matambre a la pizza con pure de papa',
         slug: 'matambre-a-la-pizza-con-pure-de-papa',
         price: 850,
         inStock: true,
         type: 'meat',
         ingredients: [
            'Jamón',
            'Leche',
            'Manteca',
            'Matambre',
            'Mozzarella',
            'Papa',
            'Salsa de tomate',
         ],
         nutritionalInfo: {
            Calorías: '875 kcal',
            Proteína: '53,9 g',
            Colesterol: ' g',
            Fibras: '6,3 g',
            Sodio: '1298 mg',
            Carbohidratos: '49,4 g',
            Grasas: '24,4 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'medallones-de-calabaza-con-croquetas-de-verdura.jpg',
         name: 'Medallones de calabaza con croquetas de verdura',
         slug: 'medallones-de-calabaza-con-croquetas-de-verdura',
         price: 750,
         inStock: true,
         type: 'vegetarian',
         bestSeller: true,
         ingredients: ['Acelga', 'Calabaza', 'Harina', 'Huevo', 'Leche', 'Pan rallado'],
         nutritionalInfo: {
            Calorías: '395 kcal',
            Proteína: '17,8 g',
            Colesterol: ' g',
            Fibras: '6 g',
            Sodio: '265,5 mg',
            Carbohidratos: '63 g',
            Grasas: '2,6 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'milanesa-de-cerdo-con-calabazas-asadas.jpg',
         name: 'Milanesa de cerdo con calabazas asadas',
         slug: 'milanesa-de-cerdo-con-calabazas-asadas',
         price: 950,
         inStock: true,
         type: 'meat',
         ingredients: ['Aceite', 'Calabaza', 'Huevo', 'Leche', 'Manteca', 'Cerdo', 'Pan rallado'],
         nutritionalInfo: {
            Calorías: '638 kcal',
            Proteína: '41,2 g',
            Colesterol: ' g',
            Fibras: '5 g',
            Sodio: '142 mg',
            Carbohidratos: '31,7 g',
            Grasas: '9,2 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
      {
         image: 'milanesa-de-pollo-con-salvado-de-trigo-y-calabazas-asadas.jpg',
         name: 'Milanesa de pollo con salvado de trigo y calabazas asadas',
         slug: 'milanesa-de-pollo-con-salvado-de-trigo-y-calabazas-asadas',
         price: 850,
         inStock: true,
         type: 'chicken',
         bestSeller: true,
         ingredients: ['Calabaza', 'Huevo', 'Pollo', 'Salvado de trigo'],
         nutritionalInfo: {
            Calorías: '465 kcal',
            Proteína: '43,6 g',
            Colesterol: ' g',
            Fibras: '16,0 g',
            Sodio: '467 mg',
            Carbohidratos: '26,8 g',
            Grasas: '1,0 g',
         },
         howToHeat: 'Descripción de cómo calentar',
      },
   ],
};
