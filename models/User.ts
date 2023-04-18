import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema(
   {
      name: { type: String },
      lastName: { type: String },
      email: { type: String, unique: true },
      phone: { type: String },
      dni: { type: String },
      password: { type: String },
      avatar: { type: String },

      points: { type: Number },
      redeemPoints: { type: Number },

      referralCode: { type: String, unique: true },

      role: {
         type: String,
         enum: {
            values: ['admin', 'client', 'kitchen', 'seo'],
            message: '{VALUE} is not a valid role',
            default: 'client',
         },
      },

      shipping: {
         address: { type: String },
         address2: { type: String },
         zipcode: { type: String },
         city: {
            type: String,

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

      resetPasswordToken: { type: String },
      resetPasswordExpires: { type: Date },
   },

   { timestamps: true },
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
