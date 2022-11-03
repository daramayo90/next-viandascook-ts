import { NextPage } from 'next';

import { ShopLayout } from '../../components/layouts';

import { Account, Options } from '../../components/profile';

import styles from '../../styles/Profile.module.css';

const ProfilePage: NextPage = () => {
   return (
      <ShopLayout title={'Mi Cuenta'} pageDescription={''}>
         <section className={styles.profile}>
            <div className={styles.container}>
               <Account />

               <Options />
            </div>
         </section>
      </ShopLayout>
   );
};

export default ProfilePage;
