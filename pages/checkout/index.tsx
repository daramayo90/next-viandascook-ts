import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { useContext } from 'react';

import { IUser } from '../../interfaces';

import { AuthContext, OrdersContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import {
   Address,
   CartSummary,
   CheckoutSummary,
   DeliveryDate,
   Promos,
} from '../../components/checkout';

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
               <Address shipping={shipping} />

               <Promos />

               <DeliveryDate />

               <CheckoutSummary />
            </div>
         </section>
         <CartSummary />
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const session = await unstable_getServerSession(req, res, authOptions);

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
