import { useContext } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { AuthContext, OrdersContext } from '../../context';

import { IUser } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import {
   Address,
   CheckoutSummary,
   DeliveryDate,
   Points,
   Posting,
   Promos,
   ReferralCodes,
   SelectedProducts,
} from '../../components/checkout';

import styles from '../../styles/Checkout.module.css';
import { SideProductsMenu } from '../../components/ui';

interface Props {
   user?: IUser;
}

const CheckoutPage: NextPage<Props> = ({ user }) => {
   const { shippingAddress } = useContext(OrdersContext);
   const { isLoggedIn } = useContext(AuthContext);

   const shipping = isLoggedIn ? user?.shipping : shippingAddress;

   return (
      <ShopLayout title={'Viandas Cook - Finalizar Compra'} pageDescription={''}>
         <section className={styles.checkout}>
            <div className={styles.container}>
               <div className={styles.selection}>
                  <Address shipping={shipping} />

                  <Promos />

                  <ReferralCodes />

                  <Points />

                  <SelectedProducts />

                  <SideProductsMenu />

                  <DeliveryDate />
               </div>

               <div className={styles.summary}>
                  <CheckoutSummary />

                  <Posting />
               </div>
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const session: any = await getServerSession(req, res, authOptions);

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
