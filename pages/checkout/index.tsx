import { useContext, useEffect } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { AuthContext, CartContext, OrdersContext } from '../../context';

import { IUser } from '../../interfaces';

import { ga, meta } from '../../utils';

import { ShopLayout } from '../../components/layouts';
import { SideProductsMenu } from '../../components/ui';
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

interface Props {
   user?: IUser;
}

const CheckoutPage: NextPage<Props> = ({ user }) => {
   const { shippingAddress } = useContext(OrdersContext);
   const { isLoggedIn } = useContext(AuthContext);
   const { total, cart } = useContext(CartContext);

   const shipping = isLoggedIn ? user?.shipping : shippingAddress;

   const items = cart.map(({ _id, name, price, quantity }) => ({
      item_id: _id,
      item_name: name,
      affiliation: 'Viandas Cook Store',
      currency: 'ARS',
      price,
      quantity,
   }));

   useEffect(() => {
      ga.event({
         action: 'begin_checkout',
         currency: 'ARS',
         items,
         value: total,
      });
   }, [items, total]);

   useEffect(() => {
      meta.beginCheckout(cart);
   }, [cart]);

   return (
      <ShopLayout title={'Finalizar Compra | Viandas Cook'} pageDescription={''} noIndex>
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
