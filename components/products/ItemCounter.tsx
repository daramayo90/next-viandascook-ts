import { FC } from 'react';

import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import { HiOutlineTrash } from 'react-icons/hi';

import styles from '../../styles/ItemCounter.module.css';

interface Props {
   color?: string;
   currentValue: number;
   updatedQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ color, currentValue, updatedQuantity }) => {
   const styleBox = {
      color,
   };

   const addOrRemove = (value: number) => {
      if (value === -1) {
         if (currentValue === 0) return;

         return updatedQuantity(currentValue - 1);
      }

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
