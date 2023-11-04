import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { IUser } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import { AddressForm } from '../../components/checkout';

import styles from '../../styles/Address.module.css';

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
      <ShopLayout title={'Mi Perfil | Viandas Cook'} pageDescription={''} noIndex>
         <section className={styles.address}>
            <div className={styles.container}>
               <AddressForm userdb={user} />
            </div>
         </section>
      </ShopLayout>
   );
};

export default ProfilePage;
