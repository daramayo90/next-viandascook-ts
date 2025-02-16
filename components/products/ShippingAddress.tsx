import { FC, useContext } from 'react';
import { CartContext } from '../../context';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';

import styles from '../../styles/Products.module.css';
import { currency } from '../../utils';

interface Props {
   shippingAddress?: string;
   openAddressModal: () => void;
}

export const ShippingAddress: FC<Props> = ({ shippingAddress, openAddressModal }) => {
   const { shipping } = useContext(CartContext);

   if (!shippingAddress || shippingAddress === '-') {
      return (
         <div className={styles.shipping}>
            <p className={styles.text}>
               Para saber si llegamos a tu domicilio, hacé click{' '}
               <span className={styles.openModal} onClick={openAddressModal}>
                  aquí
               </span>
            </p>
         </div>
      );
   }

   return (
      <>
         <div className={styles.shippingAddress}>
            <div className={styles.address}>
               <FaMapMarkerAlt className={styles.icon} />
               <p>{shippingAddress}</p>
            </div>
            <p className={styles.updateAddress} onClick={openAddressModal}>
               Cambiar
            </p>
         </div>

         <div className={styles.shipping}>
            <TbTruckDelivery className={styles.icon} />
            <p className={styles.text}>Envío: {currency.format(shipping)}</p>
         </div>
      </>
   );
};
