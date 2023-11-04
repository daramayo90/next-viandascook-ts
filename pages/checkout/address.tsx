import { GetServerSideProps, NextPage } from 'next/types';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import { dbUsers } from '../../database';
import { IUser } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import { AddressForm } from '../../components/checkout';

import styles from '../../styles/Address.module.css';

interface Props {
   userdb?: IUser;
}

const AddressPage: NextPage<Props> = ({ userdb }) => {
   return (
      <ShopLayout title={'Iniciar Sesión | Viandas Cook'} pageDescription={''} noIndex>
         <section className={styles.address}>
            <div className={styles.container}>
               <AddressForm userdb={userdb} />
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

   if (!user)
      return {
         props: {},
      };

   const userdb = await dbUsers.getUser(user.email);

   return {
      props: { userdb },
   };
};

export default AddressPage;
