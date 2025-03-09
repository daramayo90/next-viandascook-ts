import { FC } from 'react';
import Image from 'next/image';

import { typesList } from '../../utils';

import styles from '../../styles/TypesList.module.css';

interface Props {
   type: string;
   setType: (value: string) => void;
   setPage: (value: number) => void;
}

export const TypesList: FC<Props> = ({ type, setType, setPage }) => {
   const typeFilter = (type: string) => {
      setPage(1);
      setType(type);
   };

   return (
      <div className={styles.types}>
         <h2 className={styles.title}>Filtrar tus viandas por categorías:</h2>

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
