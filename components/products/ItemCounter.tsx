import { FC } from 'react';

import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import { HiOutlineTrash } from 'react-icons/hi';

import { IOrderItem, IProduct } from '../../interfaces';

import { ga, meta } from '../../analytics';

import styles from '../../styles/ItemCounter.module.css';

interface Props {
   color?: string;
   currentValue: number;
   updatedQuantity: (quantity: number) => void;
   product: IProduct | IOrderItem;
}

export const ItemCounter: FC<Props> = ({ color, currentValue, updatedQuantity, product }) => {
   const styleBox = {
      color,
   };

   const addOrRemove = (value: number) => {
      if (value === -1) {
         if (currentValue === 0) return;

         ga.event({
            action: 'remove_from_cart',
            currency: 'ARS',
            items: [
               {
                  item_id: product._id,
                  item_name: product.name,
                  affiliation: 'Viandas Cook Store',
                  currency: 'ARS',
                  price: product.price,
                  quantity: 1,
               },
            ],
            value: product.price,
         });

         meta.removeFromCart(product);

         return updatedQuantity(currentValue - 1);
      }

      ga.event({
         action: 'add_to_cart',
         currency: 'ARS',
         items: [
            {
               item_id: product._id,
               item_name: product.name,
               affiliation: 'Viandas Cook Store',
               currency: 'ARS',
               price: product.price,
               quantity: 1,
            },
         ],
         value: product.price,
      });

      meta.addToCart(product);

      return updatedQuantity(currentValue + 1);
   };

   return (
      <div className={styles.box} style={styleBox}>
         <div className={styles.iconButton} onClick={() => addOrRemove(-1)}>
            {currentValue === 1 ? (
               <HiOutlineTrash className={styles.icon} />
            ) : (
               <IoMdRemoveCircleOutline className={styles.icon} />
            )}
         </div>

         <span className={styles.counter}>{currentValue}</span>

         <div className={styles.iconButton} onClick={() => addOrRemove(+1)}>
            <IoMdAddCircleOutline className={styles.icon} />
         </div>
      </div>
   );
};
