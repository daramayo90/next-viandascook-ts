import { cloudImagesPath } from '../../../utils';
import { Button } from '../Button';

import styles from '../../../styles/loyalty/Loyalty.module.scss';

export const ViandLovers = () => {
   return (
      <div className={styles.viandlovers}>
         <div className={styles.container}>
            <img className={styles.clubImg} src={`${cloudImagesPath}/hfrf6xqhfar7rsdv7jri`} />
            <img className={styles.personsImg} src={`${cloudImagesPath}/mgkf48qpx6qz7eabunos`} />
            <img className={styles.rocketImg} src={`${cloudImagesPath}/cwkrcmakydgb355t9yaf`} />
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
