import { useContext } from 'react';
import { NextPage } from 'next/types';

import { Address, Promos } from '../../components/checkout';
import { ShopLayout } from '../../components/layouts';
import { CartMenu, CheckoutSummary } from '../../components/cart';

import { AuthContext, OrdersContext } from '../../context';

import styles from '../../styles/Checkout.module.css';

const CheckoutPage: NextPage = () => {
   const { shippingAddress } = useContext(OrdersContext);
   const { isLoggedIn, user } = useContext(AuthContext);

   const shipping = isLoggedIn ? user?.shipping : shippingAddress;

   if (!shipping) {
      return <></>;
   }

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

export default CheckoutPage;
