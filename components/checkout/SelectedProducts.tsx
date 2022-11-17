import { useContext } from 'react';

import { UIContext } from '../../context';

import { GiSpoon } from 'react-icons/gi';

import styles from '../../styles/Checkout.module.css';

export const SelectedProducts = () => {
   const { toggleProductsMenu } = useContext(UIContext);

   return (
      <div className={`${styles.card} ${styles.selectedProducts}`}>
         <div className={styles.info} onClick={toggleProductsMenu}>
            <GiSpoon className={styles.iconDiscount} />
            <p className={styles.text}>Ver viandas seleccionadas</p>
         </div>
      </div>
   );
};
