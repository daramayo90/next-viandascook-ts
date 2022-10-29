import { FC, ReactNode } from 'react';
import { LoadingNavbar } from '../navbar';
import { SideMenu, TabMenu } from '../ui';

interface Props {
   children: ReactNode;
}

export const LoadingLayout: FC<Props> = ({ children }) => {
   return (
      <>
         <nav>
            <LoadingNavbar pageTitle={'Viandas Cook'} />
         </nav>

         <SideMenu />

         <main>{children}</main>

         <TabMenu />
      </>
   );
};
