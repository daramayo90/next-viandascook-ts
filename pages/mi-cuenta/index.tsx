import { GetServerSideProps, NextPage } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

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
