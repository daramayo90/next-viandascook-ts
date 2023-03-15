import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { dbUsers } from '../../database';
import { IUser } from '../../interfaces/user';

import { ShopLayout } from '../../components/layouts';
import { Account, Options } from '../../components/account';

import styles from '../../styles/Account.module.css';

interface Props {
   userDb: IUser;
}

const ProfilePage: NextPage<Props> = ({ userDb }) => {
   return (
      <ShopLayout title={'Viandas Cook - Mi Cuenta'} pageDescription={''}>
         <section className={styles.account}>
            <div className={styles.container}>
               <Account user={userDb} />

               <Options />
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const { user }: any = (await getSession({ req })) || '';

   if (!user)
      return {
         redirect: {
            destination: '/auth/login?page=/mi-cuenta',
            permanent: false,
         },
      };

   const userDb = await dbUsers.getUser(user.email);

   return {
      props: { userDb },
   };
};

export default ProfilePage;
