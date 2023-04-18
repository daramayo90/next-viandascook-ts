import { IOrder } from '../interfaces';
import { Order } from '../models';
import { db } from './';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
   console.log('3');
   await db.connect();
   console.log('4');

   const order = await Order.findById(Number(id)).lean();
   console.log('5');

   await db.disconnect();
   console.log('6');

   if (!order) return null;
   console.log('7');

   return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (email: string): Promise<IOrder[]> => {
   await db.connect();

   const orders = await Order.find({ 'user.email': email }).sort({ createdAt: -1 }).lean();

   await db.disconnect();

   return JSON.parse(JSON.stringify(orders));
};

export const payOrder = async (orderId: number): Promise<IOrder | null> => {
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

export const verifyToken = async (orderId: string, token: string): Promise<boolean> => {
   await db.connect();

   const order = await Order.findById(Number(orderId)).lean();

   if (!order) return false;

   if (token === order.token) return true;

   return false;
};
