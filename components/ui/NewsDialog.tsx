import { FC } from 'react';

import styles from '../../styles/News.module.css';

interface Props {
   setIsDialogOpen: (value: boolean) => void;
}

export const NewsDialog: FC<Props> = ({ setIsDialogOpen }) => {
   return (
      <section className={styles.newsDialog}>
         <div className={styles.container}>
            <div className={styles.closeDialog} onClick={() => setIsDialogOpen(false)}>
               <strong>X</strong>
            </div>

            <div className={styles.text}>
               <p>
                  Podés acceder al beneficio utilizando el cupón <strong>HOTVIANDAS</strong> al
                  finalizar la compra.
               </p>
               <p>Se aplicará un 20% de descuento sobre el total de la compra.</p>
            </div>
         </div>
      </section>
   );
};
