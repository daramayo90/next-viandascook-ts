import { FC } from 'react';

import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

import styles from '../../styles/ItemCounter.module.css';

interface Props {
   currentValue: number;
   updatedQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, updatedQuantity }) => {
   const addOrRemove = (value: number) => {
      if (value === -1) {
         if (currentValue === 0) return;

         return updatedQuantity(currentValue - 1);
      }

      return updatedQuantity(currentValue + 1);
   };

   return (
      <div className={styles.box}>
         <div className={styles.iconButton} onClick={() => addOrRemove(-1)}>
            <IoMdRemoveCircleOutline className={styles.icon} />
         </div>

         <span className={styles.counter}>{currentValue}</span>

         <div className={styles.iconButton} onClick={() => addOrRemove(+1)}>
            <IoMdAddCircleOutline className={styles.icon} />
         </div>
      </div>
   );
};
