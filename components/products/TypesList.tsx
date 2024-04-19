import { FC } from 'react';
import Image from 'next/image';

import { typesList } from '../../utils';

import styles from '../../styles/TypesList.module.css';

interface Props {
   type: string;
   setType: (value: string) => void;
}

export const TypesList: FC<Props> = ({ type, setType }) => {
   const typeFilter = (type: string) => {
      setType(type);
   };

   return (
      <div className={styles.types}>
         <h3 className={styles.title}>Filtrar por categorías:</h3>

         <div className={styles.container}>
            {typesList.map(({ icon, name, model }) => (
               <div
                  key={name}
                  className={type === model ? `${styles.type} ${styles.selected}` : `${styles.type}`}
                  onClick={() => typeFilter(model)}>
                  <div className={styles.b}>
                     <div className={styles.nextImage}>
                        <Image src={icon} alt={name} layout='fill' objectFit='cover' />
                     </div>
                     <span>{name}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};
