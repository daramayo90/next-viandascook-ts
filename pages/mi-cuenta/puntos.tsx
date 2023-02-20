import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next/types';
import { getSession } from 'next-auth/react';

import { IUser } from '../../interfaces/user';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/Points.module.css';
import { Button } from '../../components/ui';

const MyPointsPage: NextPage = () => {
   const [user, setUser] = useState<IUser | undefined>();
   const { points } = useContext(CartContext);
   const { redeemPoints = 0 } = (user as IUser) || '';

   useEffect(() => {
      const userSession = async () => {
         const session = (await getSession()) as any;
         setUser(session.user);
      };
      userSession();
   }, []);

   if (!user) return <></>;

   return (
      <ShopLayout title={'Viandas Cook - Mis Puntos'} pageDescription={''}>
         <section className={styles.points}>
            <div className={styles.container}>
               <div className={styles.balance}>
                  <h3 className={styles.title}>Balance Actual</h3>

                  {!points ? (
                     <span className={styles.userPoints}>
                        <strong>{redeemPoints}</strong> Puntos
                     </span>
                  ) : (
                     <span className={styles.userPoints}>
                        <strong>{redeemPoints}</strong> Puntos
                     </span>
                  )}
               </div>

               <div className={styles.minimun}>
                  <span>
                     Para canjear puntos es necesario un mínimo de <strong>$6.000</strong> en el
                     carrito
                  </span>
               </div>

               <div className={styles.conversion}>
                  <span>30 puntos equivalen a $1</span>
               </div>

               <div className={styles.btn}>
                  <Button
                     href={'/loyalty'}
                     content={'Ver Más'}
                     color='var(--textColor)'
                     border='2px solid var(--textColor)'
                  />
               </div>
            </div>
         </section>
      </ShopLayout>
   );
};

export default MyPointsPage;
