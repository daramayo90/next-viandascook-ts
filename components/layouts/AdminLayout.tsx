import { FC, ReactNode } from 'react';

import { SideAdminMenu } from '../ui';
import { AdminNavbar } from '../navbar';

import styles from '../../styles/AdminLayout.module.css';

interface Props {
   children: ReactNode;
   title: string;
   subTitle: string;
   icon?: ReactNode;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
   return (
      <>
         <nav>
            <AdminNavbar />
         </nav>

         <main>
            <div className={styles.container}>
               <div className={styles.titleBox}>
                  <span className={styles.icon}>{icon}</span>
                  <h1 className={styles.title}>{title}</h1>
               </div>
               <h2 className={styles.subTitle}>{subTitle}</h2>
            </div>

            <div className='fadeIn'>{children}</div>
         </main>

         <SideAdminMenu />
      </>
   );
};