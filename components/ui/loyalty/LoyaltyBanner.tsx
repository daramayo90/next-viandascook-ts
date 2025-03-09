import { Button } from '../Button';
import { cloudImagesPath } from '../../../utils';

import styles from './styles/Loyalty.module.scss';
import Image from 'next/image';

export const LoyaltyBanner = () => {
   return (
      <div className={styles.intro}>
         <div className={styles.container}>
            <div className={styles.cellphoneImg}>
               <Image
                  src={`${cloudImagesPath}/grwjsemh9ejzfit3vqt7`}
                  alt={'Viandas Club Banner'}
                  width={600}
                  height={600}
               />
            </div>
            <div className={styles.info}>
               <p className={styles.title}>Vc Loyalty</p>
               <h1 className={styles.subtitle}>Programa de puntos de Viandas Cook</h1>
               <p className={styles.text}>
                  Unite a nuestra comunidad de <strong>Viandlovers</strong> y empezá a disfrutar de
                  ahorros desde tu primera compra
               </p>
               <div className={styles.btn}>
                  <Button
                     href={'/mi-cuenta/puntos'}
                     content={'Conocer más'}
                     color='var(--white)'
                     border='2px solid var(--white)'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
