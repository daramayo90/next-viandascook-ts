import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema = new Schema(
   {
      image: { type: String, unique: true },
      name: { type: String, required: true, unique: true, default: '' },
      slug: { type: String, required: true, unique: true },
      price: { type: Number, required: true, default: 0 },
      inStock: { type: Boolean, required: true, default: true },
      ingredients: [{ type: String }],
      nutritionalInfo: {
         type: Object,
         default: {
            Calorías: '0 kcal',
            Proteína: '0 g',
            Colesterol: '0 g',
            Fibras: '0 g',
            Sodio: '0 mg',
            Carbohidratos: '0 g',
            Grasas: '0 g',
         },
      },
      howToHeat: { type: String, default: '' },
      bestSeller: { type: Boolean, default: false },
      type: [
         {
            type: String,
            enum: {
               values: [
                  'chicken',
                  'dairyfree',
                  'glutenfree',
                  'keto',
                  'lowcalories',
                  'lowcarbs',
                  'lowsodium',
                  'meat',
                  'pasta',
                  'seafood',
                  'vegan',
                  'vegetarian',
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
