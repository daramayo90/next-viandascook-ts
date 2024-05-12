import Image from 'next/image';
import Link from 'next/link';

import { cloudDiscountsPath } from '../../../utils';

import styles from '../../../styles/loyalty/Loyalty.module.scss';

const discounts = [
   {
      name: 'Descuento llevando 14 viandas o más',
      img: `${cloudDiscountsPath}/yvh9u82mdmzrlzixfxjr`,
   },
   {
      name: 'Descuento llevando 28 viandas o más',
      img: `${cloudDiscountsPath}/huwv7w5kvkdz3fk6olgr`,
   },
   {
      name: 'Descuento llevando 56 viandas o más',
      img: `${cloudDiscountsPath}/i5iikxzlvuekcfv90avt`,
   },
];

export const Benefits = () => {
   return (
      <div className={styles.benefits}>
         <h3 className={styles.title}>Descubrí más beneficios</h3>
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
