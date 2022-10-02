import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';

import { IProduct } from '../../interfaces';

import { typesList } from '../../utils';

import styles from '../../styles/TypesList.module.css';

interface Props {
   type: string;
   setType: Dispatch<SetStateAction<string>>;
}

export const TypesList: FC<Props> = ({ type, setType }) => {
   const typeFilter = (type: string) => {
      setType(type);
   };

   return (
      <div className={styles.types}>
         <div className={styles.container}>
            {typesList.map(({ icon, name, model }) => (
               <div key={name} className={styles.type} onClick={() => typeFilter(model)}>
                  <div
                     className={
                        type === model
                           ? `${styles.borderImage} ${styles.borderSelected}`
                           : `${styles.borderImage}`
                     }>
                     <div className={styles.nextImage}>
                        <Image src={icon} width={100} height={100} priority />
                     </div>
                  </div>
                  <span>{name}</span>
               </div>
            ))}
         </div>
      </div>
   );
};
