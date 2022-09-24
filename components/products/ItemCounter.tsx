import { FC, useState } from 'react';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

import styles from '../../styles/ItemCounter.module.css';

export const ItemCounter: FC = () => {
   const [currentValue, setCurrentValue] = useState(0);

   const addOrRemove = (value: number) => {
      if (value === -1) {
         if (currentValue === 0) return;

         return setCurrentValue(currentValue - 1);
      }

      return setCurrentValue(currentValue + 1);
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
