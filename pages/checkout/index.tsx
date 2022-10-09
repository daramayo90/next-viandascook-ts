import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next/types';
import { getSession, useSession } from 'next-auth/react';

import { IUser } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import { Address, Promos } from '../../components/checkout';
import { CartMenu, CheckoutSummary } from '../../components/cart';

import { AuthContext, OrdersContext } from '../../context';

import styles from '../../styles/Checkout.module.css';

const CheckoutPage: NextPage = () => {
   const { shippingAddress } = useContext(OrdersContext);
   const [userSession, setUserSession] = useState<any>('');

   useEffect(() => {
      const verifySession = async () => {
         const session = await getSession();

         if (session) {
            const { user } = session;
            setUserSession(user);
         }
      };

      verifySession();
   }, []);

   const shipping = userSession ? userSession.shipping : shippingAddress;

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

// export const getStaticProps: GetStaticProps = async () => {
//    const session = await getSession();

//    console.log(session);

//    if (session) {
//       const { user } = session;

//       return {
//          props: { user },
//       };
//    }

//    return {
//       props: {},
//    };
// };

export default CheckoutPage;
