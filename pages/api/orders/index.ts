import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
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
   const {
      orderItems,
      discount = 0,
      pointsDiscount = 0,
      couponDiscount = 0,
      referralDiscount = 0,
      cashDiscount = 0,
      shipping,
      total,
   } = req.body as IOrder;

   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

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
         return (
            current.quantity * (current.discountPrice ? current.discountPrice : current.price) + prev
         );
      }, 0);

      const totalDisc = discount + pointsDiscount + couponDiscount + referralDiscount + cashDiscount;
      const backendTotal = subTotal - totalDisc + shipping;

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

      const orderId = await customIdGenerator();

      console.log('req.body', req.body);

      const newOrder = new Order({ ...req.body, _id: orderId, isPaid: false, user: orderUser });

      newOrder.total = Math.round(newOrder.total * 100) / 100;

      await newOrder.save();

      if (pointsDiscount === 0) {
         await User.updateOne(
            { email: dbUser?.email },
            {
               $set: {
                  points: dbUser ? dbUser.points + Math.round((total - shipping) * 2) : 0,
                  redeemPoints: dbUser ? dbUser.redeemPoints + Math.round((total - shipping) * 2) : 0,
               },
            },
         );
      }

      await db.disconnect();

      return res.status(201).json(newOrder);
   } catch (error) {
      await db.disconnect();

      console.log(error);

      res.status(400).json({ message: 'Existe un error con el pago, contactar al Admin' });
   }
};

const customIdGenerator = async (): Promise<number> => {
   const lastOrder = await Order.findOne().sort({ createdAt: -1 }).limit(1).lean();

   const newOrderId = lastOrder!._id + Math.floor(Math.random() * 5) + 1;

   return newOrderId;
};
