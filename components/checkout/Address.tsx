import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { IAddress } from '../../interfaces';

import { LoadingBars } from '../ui';

import { AiOutlineRight } from 'react-icons/ai';
import { RiMapPinFill } from 'react-icons/ri';

import styles from '../../styles/Checkout.module.css';

interface Props {
   shipping?: IAddress;
}

export const Address: FC<Props> = ({ shipping }) => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (shipping) {
         setIsLoading(false);
      }
   }, [shipping]);

   return (
      <Link href='/checkout/address'>
         <div className={styles.deliveryAddress}>
            <div className={styles.info}>
               <span className={styles.title}>Enviar a..</span>

               <div className={styles.address}>
                  <RiMapPinFill className={styles.iconMap} />

                  {!shipping ? (
                     <p className={styles.text}>Datos de envío</p>
                  ) : isLoading ? (
                     <LoadingBars />
                  ) : (
                     <p className={styles.text}>
                        {shipping.address.length > 30
                           ? shipping.address.substring(0, 30) + '...'
                           : shipping.address}
                     </p>
                  )}

                  <AiOutlineRight className={styles.iconRight} />
               </div>
            </div>
         </div>
      </Link>
   );
};
