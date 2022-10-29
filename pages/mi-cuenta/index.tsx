import { NextPage } from 'next';

import { ShopLayout } from '../../components/layouts';
import { TabMenu } from '../../components/ui';

import { Account } from '../../components/profile';
import { Options } from '../../components/profile/Options';

import styles from '../../styles/Profile.module.css';

const ProfilePage: NextPage = () => {
   console.log('test mi-cuenta');
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
