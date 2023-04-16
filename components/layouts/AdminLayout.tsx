import { FC, ReactNode } from 'react';
import Head from 'next/head';

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
         <Head>
            <title>{title}</title>
            <meta name='og:title' content={title} />
         </Head>

         <nav>
            <AdminNavbar />
         </nav>

         <main>
            <div className={styles.layout}>
               <div className={styles.titleBox}>
                  <span className={styles.icon}>{icon}</span>
                  <h1 className={styles.title}>
                     {title} {subTitle}
                  </h1>
               </div>
            </div>

            <div className='fadeIn'>{children}</div>
         </main>

         <SideAdminMenu />
      </>
   );
};
