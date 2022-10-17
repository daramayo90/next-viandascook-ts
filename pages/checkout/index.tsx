import { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { getSession } from 'next-auth/react';

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const session = await getSession({ req });

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
