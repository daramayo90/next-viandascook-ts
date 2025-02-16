import { FC, useContext, useState } from 'react';
import { CartContext } from '../../context';

import styles from '../../styles/OrderSummary.module.css';
import { currency } from '../../utils';
import Cookies from 'js-cookie';
import { AddressModal } from '../modals';

export const ShippingCalculation: FC = () => {
   const { shipping } = useContext(CartContext);

   const [showModal, setShowModal] = useState(false);

   const openAddressModal = () => {
      Cookies.set('isModalShown', 'false');
      setShowModal(true);
   };

   const closeAddressModal = () => {
      Cookies.set('isModalShown', 'true');
      setShowModal(false);
   };

   return (
      <>
         <div className={styles.shipping}>
            {shipping === 0 ? (
               <span className={styles.pointer} onClick={openAddressModal}>
                  Calcular envío
               </span>
            ) : (
               <>
                  <span>{currency.format(shipping)}</span>

                  <span className={styles.pointer} onClick={openAddressModal}>
                     Recalcular
                  </span>
               </>
            )}
         </div>

         <AddressModal isOpen={showModal} onClose={closeAddressModal} />
      </>
   );
};
