import { FC, ReactNode } from 'react';

import styles from '../../styles/Dashboard.module.css';

interface Props {
   total: string | number;
   description: string;
   icon: ReactNode;
   color: string;
}

export const SummaryTile: FC<Props> = ({ total, description, icon, color }) => {
   return (
      <div className={styles.box} style={{ backgroundColor: color }}>
         <div className={styles.details}>
            <div className={styles.icon}>{icon}</div>

            <div className={styles.info}>
               <span className={styles.description}>{description}</span>
               <span className={styles.total}>{total}</span>
            </div>
         </div>
      </div>
   );
};
