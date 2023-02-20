import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { IUser } from '../../interfaces/user';

import { ShopLayout } from '../../components/layouts';
import { Account, Options } from '../../components/account';

import styles from '../../styles/Account.module.css';

const ProfilePage: NextPage = () => {
   const [user, setUser] = useState<IUser | undefined>();

   useEffect(() => {
      const userSession = async () => {
         const session = (await getSession()) as any;
         setUser(session.user);
      };
      userSession();
   }, []);

   if (!user) return <></>;

   return (
      <ShopLayout title={'Viandas Cook - Mi Cuenta'} pageDescription={''}>
         <section className={styles.account}>
            <div className={styles.container}>
               <Account user={user} />

               <Options />
            </div>
         </section>
      </ShopLayout>
   );
};

export default ProfilePage;
