import { useContext, useState } from 'react';

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { useRouter } from 'next/router';

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
   const router = useRouter();

   const { shippingAddress, createOrder } = useContext(OrdersContext);
   const { isLoggedIn } = useContext(AuthContext);

   const [isPosting, setIsPosting] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const onCreateOrder = async () => {
      setIsPosting(true);
      const { hasError, message } = await createOrder();

      if (hasError) {
         setIsPosting(false);
         setErrorMsg(message);
         return;
      }

      // router.replace(`/orders/${message}`);
   };

   const shipping = isLoggedIn ? user?.shipping : shippingAddress;

   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.checkout}>
            <div className={styles.container}>
               <Address shipping={shipping} />

               <Promos />

               <DeliveryDate />

               <CheckoutSummary />

               <button disabled={isPosting} onClick={onCreateOrder}>
                  Finalizar Compra
               </button>

               {errorMsg && <span className={styles.error}>{errorMsg}</span>}
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
