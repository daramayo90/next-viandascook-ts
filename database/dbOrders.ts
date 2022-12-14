import { isValidObjectId } from 'mongoose';
import { IOrder } from '../interfaces';
import { Order } from '../models';
import { db } from './';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
   if (!isValidObjectId(id)) return null;

   await db.connect();

   const order = await Order.findById(id).lean();

   await db.disconnect();

   if (!order) return null;

   return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (email: string): Promise<IOrder[]> => {
   await db.connect();

   const orders = await Order.find({ 'user.email': email }).lean();

   await db.disconnect();

   return JSON.parse(JSON.stringify(orders));
};
