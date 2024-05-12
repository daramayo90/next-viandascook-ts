import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../Button';
import { cloudImagesPath } from '../../../utils';

import styles from '../../../styles/loyalty/Loyalty.module.scss';

export const AdditionalInfo = () => {
   return (
      <div className={styles.additionalInfo}>
         <div className={styles.info}>
            <div className={styles.box}>
               <div className={styles.icon}>
                  <Image
                     src={'/icon/loyalty-puntos-extra.png'}
                     alt='Loyalty - Puntos Extra'
                     width={100}
                     height={100}
                     priority={true}
                  />
               </div>
               <h3 className={styles.title}>Puntos Extra</h3>
               <p className={styles.text}>
                  <strong>Sumá puntos extra</strong> desde refiriendo a un amigo, completando tu perfil
                  o hasta en el día de tu cumpleaños.
               </p>
            </div>

            <div className={styles.box}>
               <div className={styles.icon}>
                  <Image
                     src={'/icon/loyalty-mi-cuenta.png'}
                     alt='Loyalty - Mi Cuenta'
                     width={100}
                     height={100}
                     priority={true}
                  />
               </div>
               <h3 className={styles.title}>Mi Cuenta</h3>
               <p className={styles.text}>
                  Desde{' '}
                  <strong>
                     <Link href='/mi-cuenta/puntos'>Mi Cuenta</Link>
                  </strong>{' '}
                  podrás encontrar todos tus puntos acumulados y los desafíos para obtener{' '}
                  <strong>más puntos</strong>.
               </p>
            </div>

            <div className={styles.btn}>
               <Button
                  href={'/mi-cuenta'}
                  content={'Ir a Mi Cuenta'}
                  color='var(--black)'
                  border='2px solid var(--black)'
               />
            </div>
         </div>

         <div className={styles.productsMobile}>
            <Image
               src={`${cloudImagesPath}/loddgy5gxrldyucpqvp1`}
               alt='Loyalty - Viandas'
               layout='fill'
               objectFit='cover'
            />
         </div>

         <div className={styles.productsDesktop}>
            <Image
               src={`${cloudImagesPath}/laz145l0ywut4orezfn1`}
               alt='Loyalty - Viandas'
               layout='fill'
               objectFit='cover'
            />
         </div>
      </div>
   );
};
