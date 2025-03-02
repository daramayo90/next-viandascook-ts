import Image from 'next/image';
import Link from 'next/link';

import { discounts } from '../../../utils';

import styles from './styles/Loyalty.module.scss';

export const Benefits = () => {
   return (
      <div className={styles.benefits}>
         <h2 className={styles.title}>Descubrí más beneficios</h2>
         <div className={styles.container}>
            {discounts.map(({ name, img }) => (
               <div key={name} className={styles.discount}>
                  <Link href='/descuentos'>
                     <Image src={img} alt={name} width={420} height={220} priority={true} />
                  </Link>
               </div>
            ))}
         </div>
      </div>
   );
};
