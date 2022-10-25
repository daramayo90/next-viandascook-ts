import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema(
   {
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phone: { type: String, required: true },
      dni: { type: String, required: true },
      password: { type: String, required: true },

      role: {
         type: String,
         enum: {
            values: ['admin', 'client'],
            message: '{VALUE} is not a valid role',
            default: 'client',
            required: true,
         },
      },

      shipping: {
         address: { type: String, required: true },
         address2: { type: String },
         zipcode: { type: String, required: true },
         city: {
            type: String,
            required: true,
            enum: {
               values: ['caba', 'ba'],
            },
            message: '{VALUE} is not a valid city',
         },
      },

      coupons: [
         {
            _id: { type: Schema.Types.ObjectId, ref: 'Coupon' },
            ussage: { type: Number },
         },
      ],
   },

   { timestamps: true },
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
