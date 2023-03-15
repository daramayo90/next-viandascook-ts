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
      avatar: { type: String, required: true },

      points: { type: Number, required: true },
      redeemPoints: { type: Number, required: true },

      referralCode: { type: String, unique: true },

      role: {
         type: String,
         enum: {
            values: ['admin', 'client', 'super-user', 'seo'],
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
               values: ['CABA', 'Buenos Aires'],
            },
            message: '{VALUE} is not a valid city',
         },
      },

      coupons: [
         {
            _id: { type: Schema.Types.ObjectId, ref: 'Coupon' },
            code: { type: String },
            ussage: { type: Number },
         },
      ],
   },

   { timestamps: true },
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
