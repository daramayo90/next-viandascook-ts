import React, { FC } from 'react';
import Link from 'next/link';

import { IAddress } from '../../interfaces';

import { AiOutlineRight } from 'react-icons/ai';
import { RiMapPinFill } from 'react-icons/ri';

import styles from '../../styles/Checkout.module.css';

interface Props {
   shipping: IAddress;
}

export const Address: FC<Props> = ({ shipping }) => {
   return (
      <Link href='/checkout/address'>
         <div className={styles.deliveryAddress}>
            <div className={styles.info}>
               <span className={styles.title}>Enviar a..</span>

               <div className={styles.address}>
                  <RiMapPinFill className={styles.iconMap} />
                  {!shipping ? (
                     <p className={styles.text}>Datos de envío</p>
                  ) : (
                     <p className={styles.text}>{shipping.address}</p>
                  )}
                  <AiOutlineRight className={styles.iconRight} />
               </div>
            </div>
         </div>
      </Link>
   );
};
