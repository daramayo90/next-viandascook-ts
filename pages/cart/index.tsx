import { useContext, useEffect } from 'react';

import { CartContext } from '../../context';
import { CartList, OrderSummary } from '../../components/cart';
import { MainLayout } from '../../components/layouts';
import { useRouter } from 'next/router';

import styles from '../../styles/Cart.module.css';

const CartPage = () => {
   const router = useRouter();
   const { isLoaded, cart } = useContext(CartContext);

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
      <MainLayout title={'Cart - 3'} pageDescription={'Shopping Cart'}>
         <section className={styles.cart}>
            <h1 className={styles.title}>Carrito</h1>

            <div className={styles.container}>
               <CartList editable />

               <OrderSummary />
            </div>
         </section>
      </MainLayout>
   );
};

export default CartPage;
