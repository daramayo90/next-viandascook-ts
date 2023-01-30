import { isValidObjectId } from 'mongoose';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { IMPStatusResponse, IOrder, IProduct } from '../interfaces';
import { Order, Product, User } from '../models';
import { db } from './';
import axios from 'axios';

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

// export const createOrder = async (payment_id: string): Promise<IOrder | null> => {
//    const {
//       cart,
//       discount = 0,
//       pointsDiscount = 0,
//       couponDiscount = 0,
//       shipping,
//       total,
//    } = req.cookies;

//    const { user }: any = (await getSession({ req })) || '';

//    const orderItems = JSON.parse(cart!).map((product: IProduct) => product);
//    const productsIds = orderItems!.map((product: IProduct) => product._id);

//    await db.connect();

//    const dbProducts = await Product.find({ _id: { $in: productsIds } });

//    try {
//       // Validate if someone made modifications in frontend
//       const subTotal: number = orderItems.reduce((prev: any, current: any) => {
//          const currentPrice = dbProducts.find((prod) => prod.id === current._id)!.price;
//          if (!currentPrice) {
//             throw new Error('Verificá el carrito nuevamente, hay un producto que no existe');
//          }
//          return current.quantity * current.price + prev;
//       }, 0);

//       const backendTotal: number =
//          subTotal -
//          Number(discount) -
//          Number(pointsDiscount) -
//          Number(couponDiscount) +
//          Number(shipping);

//       if (Number(total) !== backendTotal) {
//          throw new Error('El total no suma la cantidad comprada');
//       }

//       const id = user ? user._id : null;

//       const dbUser = await User.findById(id);

//       const orderUser = {
//          _id: id || null,
//          name: dbUser?.name || req.cookies.firstName,
//          lastName: dbUser?.lastName || req.cookies.lastName,
//          email: dbUser?.email || req.cookies.email,
//          phone: dbUser?.phone || req.cookies.phone,
//          dni: dbUser?.dni || req.cookies.dni,
//       };

//       const newOrder = new Order({ ...req.body, isPaid: true, user: orderUser });

//       newOrder.total = Math.round(newOrder.total * 100) / 100;

//       await newOrder.save();

//       await User.updateOne(
//          { email: dbUser?.email },
//          {
//             $set: {
//                points: dbUser?.points! + Number(total),
//                redeemPoints: dbUser?.redeemPoints! + Number(total),
//             },
//          },
//       );

//       await db.disconnect();

//       return JSON.parse(JSON.stringify(newOrder));
//    } catch (error) {
//       await db.disconnect();

//       console.log(error);

//       return null;
//    }
// };

export const createOrder = async (preference_id: string): Promise<IOrder | null> => {
   // TODO: Poner las variables en .env
   const { data } = await axios.get<IMPStatusResponse>(
      `https://api.mercadopago.com/checkout/preferences/${preference_id}`,
      {
         headers: {
            Authorization:
               'Bearer TEST-2684575909011712-092220-081c30fc69e0e00987f2b1f913057ebf-147648560',
         },
      },
   );

   return null;
};
