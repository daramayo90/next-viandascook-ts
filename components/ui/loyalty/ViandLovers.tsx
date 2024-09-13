import { cloudImagesPath } from '../../../utils';
import { Button } from '../Button';

import styles from '../../../styles/loyalty/Loyalty.module.scss';
import Image from 'next/image';

export const ViandLovers = () => {
   return (
      <div className={styles.viandlovers}>
         <div className={styles.container}>
            <div className={styles.clubImg}>
               <Image src={`${cloudImagesPath}/hfrf6xqhfar7rsdv7jri`} width={430} height={200} />
            </div>
            <div className={styles.personsImg}>
               <Image src={`${cloudImagesPath}/mgkf48qpx6qz7eabunos`} width={600} height={500} />
            </div>
            <div className={styles.rocketImg}>
               <Image src={`${cloudImagesPath}/cwkrcmakydgb355t9yaf`} width={600} height={600} />
            </div>
            <div className={styles.info}>
               <h3 className={styles.title}>Recomendá Viandas Cook a tus amigos</h3>
               <p className={styles.text}>
                  Compartí tu cupón con tus referidos y acumulá puntos extra para canjear en tus
                  compras por cada amigo que compre por primera vez con tu código.
               </p>
               <div className={styles.btn}>
                  <Button
                     href={'/mi-cuenta/invitar-amigos'}
                     content={'Compartir cupón'}
                     color='var(--white)'
                     border='2px solid var(--white)'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
