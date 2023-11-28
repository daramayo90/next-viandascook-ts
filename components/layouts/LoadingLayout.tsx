import { FC, ReactNode } from 'react';
import { LoadingNavbar } from '../navbar';

interface Props {
   children: ReactNode;
}

export const LoadingLayout: FC<Props> = ({ children }) => {
   return (
      <>
         <nav>
            <LoadingNavbar pageTitle={'Viandas Cook'} />
         </nav>

         <main>{children}</main>
      </>
   );
};
