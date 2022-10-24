import mongoose, { Schema, model, Model } from 'mongoose';
import { ICoupon } from '../interfaces';

const couponSchema = new Schema(
   {
      code: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      discount: { type: Number, required: true },
      enabled: { type: Boolean, required: true },

      minAmount: { type: Number },
      maxAmount: { type: Number },

      allowedEmail: { type: String },
      allowOthersCoupons: { type: Boolean },
      allowFreeShipping: { type: Boolean },

      couponLimit: { type: Number },
      userLimit: { type: Number },
      ussage: { type: Number },

      expirationDate: { type: Date },

      discount_type: {
         type: String,
         enum: {
            values: ['percentage discount', 'fixed discount'],
            default: 'percentage discount',
            message: '{VALUE} is not a valid coupon type',
            required: true,
         },
      },
   },

   { timestamps: true },
);

const Coupon: Model<ICoupon> = mongoose.models.Coupon || model('Coupon', couponSchema);

export default Coupon;
