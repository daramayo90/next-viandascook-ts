import { FC, useEffect, useState } from 'react';
import { IOrder, IOrderItem, IUser, ShippingAddress } from '../../interfaces';

import styles from '../../styles/AdminOrderDialog.module.css';

interface Props {
   order?: IOrder;
   setShowOrder: (value: boolean) => void;
}

export const OrderDialog: FC<Props> = ({ order, setShowOrder }) => {
   const [completedItems, setCompletedItems] = useState<{ [key: string]: boolean }>({});

   useEffect(() => {
      const savedCompletedItems = localStorage.getItem(`completedItems_${order?._id}`);
      if (savedCompletedItems) {
         setCompletedItems(JSON.parse(savedCompletedItems));
      }
   }, [order]);

   if (!order) return <></>;

   const { name, lastName, email, phone } = order.user as IUser;
   const { address, address2, city } = order.shippingAddress as ShippingAddress;

   const handleCompletedItem = (itemId: string) => {
      const updatedCompletedItems = { ...completedItems, [itemId]: !completedItems[itemId] };
      setCompletedItems(updatedCompletedItems);
      localStorage.setItem(`completedItems_${order._id}`, JSON.stringify(updatedCompletedItems));
   };

   return (
      <section className={styles.orderDialog}>
         <div className={styles.container}>
            <div className={styles.title}>
               <span>
                  <strong>{order._id}</strong> # {name} {lastName}
               </span>
               <div className={styles.closeDialog} onClick={() => setShowOrder(false)}>
                  <strong>X</strong>
               </div>
            </div>

            <div className={styles.details}>
               <h3>Detalles: </h3>
               <p>
                  <strong>Email: </strong>
                  {email}
               </p>
               <p>
                  <strong>Celular: </strong>
                  {phone}
               </p>
               <p>
                  <strong>Dirección: </strong> {address}, {address2}, {city}
               </p>
               <p>
                  <strong>Método de pago: </strong>
                  {order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}
               </p>
            </div>

            <div className={styles.products}>
               <h3>Viandas: </h3>
               {order.orderItems.map((product: IOrderItem) => (
                  <div className={styles.product} key={product._id}>
                     <input
                        type='checkbox'
                        checked={completedItems[product._id]}
                        onChange={() => handleCompletedItem(product._id)}
                     />
                     <span>
                        {product.name} x{product.quantity}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
