import Image from 'next/image';

import styles from '../../styles/SearchNotFound.module.css';

export const SearchNotFound = () => {
   return (
      <div className={styles.container}>
         <div className={styles.nextImage}>
            <Image
               src='/img/not-found.jpg'
               alt='No encontrado'
               width={250}
               height={250}
               priority={true}
            />
         </div>

         <h4 className={styles.subtitle}>No hay resultados</h4>
         <p className={styles.text}>
            Lo sentimos, no tenemos platos con la palabra ingresada. Podes intentar con otra.
         </p>
      </div>
   );
};
