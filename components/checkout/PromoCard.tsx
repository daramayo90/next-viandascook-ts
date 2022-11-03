import { FC } from 'react';

import styles from '../../styles/Promos.module.css';

interface Props {
   icon: JSX.Element;
   title: string;
   text: string;
   coupon: string;
   promo: string;
   select: (coupon: string) => void;
}

export const PromoCard: FC<Props> = ({ icon, title, text, coupon, promo, select }) => {
   const onAddCoupon = () => {
      select(coupon);
   };

   return (
      <div
         className={promo === coupon ? `${styles.promo} selected` : `${styles.promo}`}
         onClick={onAddCoupon}>
         <div className={styles.card}>
            {icon}

            <div className={styles.info}>
               <p className={styles.title}>{title}</p>
               <p className={styles.text}>{text}</p>
            </div>
         </div>
      </div>
   );
};
