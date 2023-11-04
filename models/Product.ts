import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema = new Schema(
   {
      image: { type: String, unique: true },
      name: { type: String, required: true, unique: true, default: '' },
      slug: { type: String, required: true, unique: true },
      price: { type: Number, required: true, default: 0 },
      discountPrice: { type: Number, default: 0 },
      inStock: { type: Boolean, required: true, default: true },
      ingredients: [{ type: String }],
      nutritionalInfo: {
         type: Object,
         default: {
            Calorías: '0 kcal',
            Proteína: '0 g',
            Fibras: '0 g',
            Sodio: '0 mg',
            Carbohidratos: '0 g',
            Grasas: '0 g',
         },
      },
      howToHeat: { type: String, default: '' },
      description: { type: String, default: '' },
      bestSeller: { type: Boolean, default: false },
      type: [
         {
            type: String,
            enum: {
               values: [
                  'Bajo en calorías',
                  'Bajo en carbo',
                  'Bajo en sodio',
                  'Carne',
                  'Empanada',
                  'Wrap',
                  'Keto',
                  'Libre de glúten',
                  'Libre de lácteos',
                  'Pasta',
                  'Pescado',
                  'Pollo',
                  'Tarta',
                  'Vegano',
                  'Vegetariano',
               ],
            },
            message: '{VALUE} is not a valid type',
         },
      ],
   },
   { timestamps: true },
);

productSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;
