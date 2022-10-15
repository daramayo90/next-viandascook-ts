import Image from 'next/image';

import styles from '../../styles/Product.module.css';

export const AditionalInfo = () => {
   return (
      <div className={styles.info}>
         <div className={styles.delivery}>
            <div className={styles.icon}>
               <div className={styles.nextImage}>
                  <Image
                     src='/img/icons/frozen.png'
                     alt='Platos Congelados'
                     width={100}
                     height={100}
                     priority={true}
                  />
               </div>
            </div>

            <div className={styles.content}>
               <h4 className={styles.title}>Los platos son enviados congelados</h4>
               <span className={styles.text}>
                  Se entregan en bolsas envasadas al vacío, que ayudan a preservar los alimentos y
                  su sabor
               </span>
            </div>
         </div>

         <div className={styles.heat}>
            <div className={styles.icon}>
               <div className={styles.nextImage}>
                  <Image
                     src='/img/icons/heat.png'
                     alt='Como calentar'
                     width={100}
                     height={100}
                     priority={true}
                  />
               </div>
            </div>

            <div className={styles.content}>
               <h4 className={styles.title}>¿Cómo calentar?</h4>
               <span className={styles.text}>
                  Preparación y cocción: 10 minutos en agua hirviendo
               </span>
            </div>
         </div>
      </div>
   );
};
