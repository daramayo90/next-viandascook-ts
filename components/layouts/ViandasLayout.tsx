import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { SideViandasMenu } from '../ui';
import { ViandasNavbar } from '../navbar';

import styles from '../../styles/AdminLayout.module.css';

interface Props {
   children: ReactNode;
   title: string;
   icon?: ReactNode;
}

export const ViandasLayout: FC<Props> = ({ children, title, icon }) => {
   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name='og:title' content={title} />
            <meta name='robots' content='noindex, nofollow' />
         </Head>

         <nav>
            <ViandasNavbar />
         </nav>

         <main>
            <div className={styles.layout}>
               <div className={styles.titleBox}>
                  <span className={styles.icon}>{icon}</span>
                  <h1 className={styles.title}>{title}</h1>
               </div>
            </div>

            <div className='fadeIn'>{children}</div>
         </main>

         <SideViandasMenu />
      </>
   );
};
