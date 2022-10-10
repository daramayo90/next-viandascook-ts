import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { getSession } from 'next-auth/react';

import { IUser } from '../../interfaces';

import { AuthContext, CartContext, OrdersContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import { Address, Promos } from '../../components/checkout';
import { CartMenu, CheckoutSummary } from '../../components/cart';

import styles from '../../styles/Checkout.module.css';
import { useRouter } from 'next/router';

interface Props {
   user?: IUser;
}

const CheckoutPage: NextPage<Props> = ({ user }) => {
   const { isLoaded, cart } = useContext(CartContext);
   const { shippingAddress } = useContext(OrdersContext);
   const { isLoggedIn } = useContext(AuthContext);

   const router = useRouter();

   useEffect(() => {
      if (isLoaded && cart.length === 0) {
         router.replace('/cart/empty');
      }
   }, [isLoaded, cart, router]);

   // Avoid render anything in client-side
   if (!isLoaded || cart.length === 0) {
      return <></>;
   }

   const shipping = isLoggedIn ? user?.shipping : shippingAddress;

   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.checkout}>
            <div className={styles.container}>
               <Address shipping={shipping} />

               <Promos />

               <div className={styles.deliveryDate}></div>

               <CheckoutSummary />
            </div>
         </section>
         <CartMenu />
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   const session = await getSession({ req });
   const { page = '/cart/empty' } = query;
   const cart = req.cookies.cart;

   if (cart && cart?.length < 10) {
      return {
         redirect: {
            destination: page.toString(),
            permanent: false,
         },
      };
   }

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
