import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema(
   {
      user: {
         _id: { type: Schema.Types.ObjectId, ref: 'User' },
         name: { type: String, ref: 'User', required: true },
         lastName: { type: String, ref: 'User', required: true },
         email: { type: String, ref: 'User', required: true },
         phone: { type: String, ref: 'User', required: true },
         dni: { type: String, ref: 'User', required: true },
      },

      orderItems: [
         {
            _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            image: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
         },
      ],

      coupons: [
         {
            _id: { type: Schema.Types.ObjectId, ref: 'Coupon' },
            code: { type: String, required: true, ref: 'Coupon' },
         },
      ],

      shippingAddress: {
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

      deliveryDate: { type: String, required: true },

      numberOfItems: { type: Number, required: true },
      subTotal: { type: Number, required: true },
      discount: { type: Number },
      shipping: { type: Number, required: true },
      couponDiscount: { type: Number },
      pointsDiscount: { type: Number },
      total: { type: Number, required: true },

      isPaid: { type: Boolean, required: true, default: false },
      paidAt: { type: String },

      transactionId: { type: String },
   },
   { timestamps: true },
);

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;
