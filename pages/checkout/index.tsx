import { useContext } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { AuthContext, OrdersContext } from '../../context';

import { IUser } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import { Address, CheckoutSummary, DeliveryDate, Posting, Promos } from '../../components/checkout';

import styles from '../../styles/Checkout.module.css';

interface Props {
   user?: IUser;
}

const CheckoutPage: NextPage<Props> = ({ user }) => {
   const { shippingAddress } = useContext(OrdersContext);
   const { isLoggedIn } = useContext(AuthContext);

   const shipping = isLoggedIn ? user?.shipping : shippingAddress;

   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.checkout}>
            <div className={styles.container}>
               <div className={styles.selection}>
                  <Address shipping={shipping} />

                  <Promos />

                  <DeliveryDate />
               </div>

               <div className={styles.summary}>
                  <CheckoutSummary />

                  <Posting user={user} />
               </div>
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const session: any = await unstable_getServerSession(req, res, authOptions);

   if (session) {
      const { user } = session;

      return {
         props: { user },
      };
   }

   return {
      props: {},
   };
};

export default CheckoutPage;
