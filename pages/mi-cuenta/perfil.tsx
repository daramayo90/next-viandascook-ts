import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { IUser } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/Address.module.css';
import Address from '../checkout/address';
import LoadingPage from '../../components/ui/Loading';

const ProfilePage: NextPage = () => {
   const [user, setUser] = useState<IUser | undefined>();

   useEffect(() => {
      const userSession = async () => {
         const session = (await getSession()) as any;
         setUser(session.user);
      };
      userSession();
   }, []);

   if (!user) return <LoadingPage />;

   return (
      <ShopLayout title={'Perfil'} pageDescription={''}>
         <section className={styles.address}>
            <div className={styles.container}>
               <Address userdb={user} />
            </div>
         </section>
      </ShopLayout>
   );
};

export default ProfilePage;
