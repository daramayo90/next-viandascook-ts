import { IOrder } from '../interfaces';
import { Order } from '../models';
import { db } from './';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
   await db.connect();

   const order = await Order.findById(Number(id)).lean();

   await db.disconnect();

   if (!order) return null;

   return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (email: string): Promise<IOrder[]> => {
   await db.connect();

   const orders = await Order.find({ 'user.email': email }).sort({ createdAt: -1 }).lean();

   await db.disconnect();

   return JSON.parse(JSON.stringify(orders));
};

export const payMpOrder = async (orderId: number): Promise<IOrder | null> => {
   // if (!isValidObjectId(orderId)) return null;

   await db.connect();

   const order = await Order.updateOne(
      { _id: orderId },
      {
         $set: {
            isPaid: true,
         },
      },
   );

   await db.disconnect();

   return JSON.parse(JSON.stringify(order));
};
