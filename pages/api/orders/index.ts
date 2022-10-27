import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product, User } from '../../../models';

type Data = { message: string } | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return createOrder(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}
const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { orderItems, discount = 0, couponDiscount = 0, shipping, total } = req.body as IOrder;

   const { user }: any = (await getSession({ req })) || '';

   const productsIds = orderItems.map((product) => product._id);

   await db.connect();

   const dbProducts = await Product.find({ _id: { $in: productsIds } });

   try {
      // Validate if someone made modifications in frontend
      const subTotal = orderItems.reduce((prev, current) => {
         const currentPrice = dbProducts.find((prod) => prod.id === current._id)!.price;
         if (!currentPrice) {
            throw new Error('Verificá el carrito nuevamente, hay un producto que no existe');
         }
         return current.quantity * current.price + prev;
      }, 0);

      const backendTotal = subTotal - discount - couponDiscount + shipping;

      if (total !== backendTotal) {
         throw new Error('El total no suma la cantidad comprada');
      }

      const id = user ? user._id : null;

      const dbUser = await User.findById(id);

      const orderUser = {
         _id: id || null,
         name: dbUser?.name || req.cookies.firstName,
         lastName: dbUser?.lastName || req.cookies.lastName,
         email: dbUser?.email || req.cookies.email,
         phone: dbUser?.phone || req.cookies.phone,
         dni: dbUser?.dni || req.cookies.dni,
      };

      const newOrder = new Order({ ...req.body, isPaid: false, user: orderUser });

      newOrder.total = Math.round(newOrder.total * 100) / 100;

      await newOrder.save();

      await db.disconnect();

      return res.status(201).json(newOrder);
   } catch (error) {
      await db.disconnect();

      console.log(error);

      res.status(400).json({ message: 'Existe un error con el pago, contactar al Admin' });
   }
};
