import sgMail from '@sendgrid/mail';
import { ICartProduct, IOrder, IUser, ShippingAddress } from '../interfaces';
import { Order, User } from '../models';
import { currency } from '../utils';
import { db } from './';
import { google } from 'googleapis';
import axios from 'axios';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
   await db.connect();

   const order = await Order.findById(Number(id))
      .populate('orderItems.productsInPack.product', 'name image')
      .lean();

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

   await db.disconnect();

   if (!order) return false;

   if (token === order.token) return true;

   return false;
};

export const addReferralPoints = async (referralCoupon: string) => {
   if (!referralCoupon) return null;

   await db.connect();

   const user: IUser | null = await User.findOne({ referralCode: referralCoupon }).lean();

   await db.disconnect();

   if (!user) return null;

   await db.connect();

   await User.updateOne(
      { email: user.email },
      {
         $set: {
            points: user.points + 300000,
            redeemPoints: user.points + 300000,
         },
      },
   );

   await db.disconnect();

   return;
};

export const sendOrderConfirmationEmail = async (id: number, url: string) => {
   await db.connect();

   const order = await Order.findById(Number(id)).lean();

   await db.disconnect();

   if (!order) return null;

   const {
      _id: orderId,
      deliveryDate,
      orderItems,
      numberOfItems,
      subTotal,
      discount = 0,
      couponDiscount = 0,
      referralDiscount = 0,
      pointsDiscount = 0,
      shipping,
      paymentMethod,
      total,
   } = order;

   const { name, email } = order.user as IUser;
   const { address, address2 } = order.shippingAddress as ShippingAddress;

   const deliveryDateObj = new Date(deliveryDate);
   const [day, month, year] = deliveryDateObj
      .toLocaleDateString('es-AR', {
         timeZone: 'America/Argentina/Buenos_Aires',
      })
      .split('/');

   const products = orderItems.map(({ image, name, quantity, price }: ICartProduct) => ({
      image,
      name,
      quantity,
      price: currency.format(price * quantity),
   }));

   const discounts = discount + couponDiscount + referralDiscount + pointsDiscount;

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   const msg = {
      to: {
         email,
         name,
      },
      from: {
         email: 'info@viandascook.com',
         name: 'Viandas Cook',
      },
      templateId: 'd-22e29fae8f8b4567bb9088b1143e8807',
      dynamic_template_data: {
         subject: `¡Tu pedido #${orderId} ya está completo!`,
         name,
         orderId,
         points: pointsDiscount === 0 ? Math.round(total - shipping) : 0,
         address: `${address}, Casa/Depto: ${address2}`,
         deliveryDate: `${day}/${month}/${year}`,
         products,
         numberOfItems,
         subTotal: currency.format(Number(subTotal)),
         discounts: currency.format(Number(discounts)),
         shipping: shipping !== 0 ? currency.format(Number(shipping)) : 'Gratis',
         paymentMethod:
            paymentMethod.toString().charAt(0).toUpperCase() + paymentMethod.toString().slice(1),
         total: currency.format(Number(total)),
         orderLink: `${url}/pedidos/${orderId}`,
      },
   };

   sgMail.send(msg);

   return;
};

export const orderToSpreadsheet = async (id: number) => {
   await db.connect();

   const order = await Order.findById(Number(id)).lean();

   await db.disconnect();

   if (!order) return null;

   const { _id, total } = order;
   const { email, dni } = order.user as IUser;

   const today = new Date().toLocaleDateString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
   });

   try {
      const auth = new google.auth.GoogleAuth({
         credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL!,
            private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
         },
         scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets',
         ],
      });

      const sheets = google.sheets({
         auth,
         version: 'v4',
      });

      await sheets.spreadsheets.values.append({
         spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
         range: 'A1:O1',
         valueInputOption: 'USER_ENTERED',
         requestBody: {
            values: [[_id, today, email, dni, 'Mercadopago', total]],
         },
      });

      return true;
   } catch (e) {
      // console.log(e);
      return false;
   }
};

export const createOptimoRouteOrder = async (id: number) => {
   await db.connect();

   const order = await Order.findById(Number(id)).lean();

   await db.disconnect();

   if (!order) return null;

   const { _id, deliveryDate, paymentMethod, total } = order;

   const { name, email, phone } = order.user as IUser;
   const { address, address2, city2 } = order.shippingAddress as ShippingAddress;

   const deliveryDateObj = new Date(deliveryDate);
   const [day, month, year] = deliveryDateObj
      .toLocaleDateString('es-AR', {
         timeZone: 'America/Argentina/Buenos_Aires',
      })
      .split('/');

   const body = {
      operation: 'CREATE',
      orderNo: _id.toString(),
      type: 'D',
      date: `${year}-${month}-${day}`,
      duration: 10,
      location: {
         address: `${address}, ${city2}`,
         locationName: `${address}, Piso/Depto: ${address2}`,
         acceptPartialMatch: true,
      },
      notes: paymentMethod !== 'mercadopago' ? `${paymentMethod}: ${currency.format(total)}` : '-',
      allowedWeekdays: ['mon', 'tue', 'wed', 'thu', 'fri'],
      email,
      phone,
      customField1: name,
   };

   const { data } = await axios.post(
      `https://api.optimoroute.com/v1/create_order?key=${process.env.OPTIMO_ROUTE_API_KEY}`,
      body,
   );

   return data;
};

export const AddNewMailchimpOrder = async (orderId: number) => {
   const API_KEY = process.env.MAILCHIMP_API_KEY!;
   const DATACENTER = process.env.MAILCHIMP_API_SERVER!;
   const ENDPOINT = `https://${DATACENTER}.api.mailchimp.com/3.0/ecommerce/stores/viandascook/orders`;

   const order = await Order.findById(Number(orderId)).lean();

   if (!order) return null;

   const { _id, name, lastName, email, dni } = order.user as IUser;
   const { address, city, city2, zipcode } = order.shippingAddress as ShippingAddress;

   const orderEndpoint = `${ENDPOINT}/${order._id!}`;

   try {
      // Attempt to fetch the order from Mailchimp to see if it exists
      await axios.get(orderEndpoint, {
         headers: {
            Authorization: `Bearer ${API_KEY}`,
         },
      });
   } catch (error: any) {
      // Order does not exist, so we create it
      if (error.response && error.response.status === 404) {
         const orderData = {
            id: order._id!.toString(),
            customer: {
               id: _id ? _id.toString() : dni,
               email_address: email,
               opt_in_status: true,
               first_name: name,
               last_name: lastName,
               address: {
                  address1: address,
                  city: city2,
                  province: city,
                  postal_code: zipcode,
                  country: 'Argentina',
                  country_code: 'AR',
               },
            },
            currency_code: 'ARS',
            order_total: order.total,
            lines: order.orderItems.map((item, index) => ({
               id: item._id.toString(),
               product_id: item._id.toString(),
               product_variant_id: item._id.toString(),
               quantity: item.quantity,
               price: item.price,
            })),
            shipping_address: {
               name: `${name} ${lastName}`,
               address1: address,
               city: city2,
               province: city,
               postal_code: zipcode,
               country: 'Argentina',
               country_code: 'AR',
            },
            processed_at_foreign: order.createdAt,
            financial_status: 'paid',
            fulfillment_status: 'paid',
         };

         await axios.post(ENDPOINT, orderData, {
            headers: {
               Authorization: `Bearer ${API_KEY}`,
            },
         });
      }
   }

   return;
};
