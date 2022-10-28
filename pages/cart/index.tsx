import { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { CartList, OrderSummary } from '../../components/cart';
import { TabMenu } from '../../components/ui';

import styles from '../../styles/Cart.module.css';

const CartPage: NextPage = () => {
   const router = useRouter();
   const { isLoaded, cart, numberOfItems } = useContext(CartContext);

   useEffect(() => {
      if (isLoaded && cart.length === 0) {
         router.replace('/cart/empty');
      }
   }, [isLoaded, cart, router]);

   // Avoid render anything in client-side
   if (!isLoaded || cart.length === 0) {
      return <></>;
   }

   return (
      <ShopLayout title={`Carrito - ${numberOfItems}`} pageDescription={'Carrito - Viandas Cook'}>
         <section className={styles.cart}>
            <div className={styles.container}>
               <CartList editable />

               <OrderSummary />
            </div>
         </section>
         <TabMenu />
      </ShopLayout>
   );
};

export default CartPage;
