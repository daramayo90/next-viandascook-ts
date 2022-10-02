import { useContext, useEffect } from 'react';

import { CartContext } from '../../context';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { useRouter } from 'next/router';

import styles from '../../styles/Cart.module.css';
import { Button } from '../../components/ui';

const CartPage = () => {
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

               <div className={styles.cartButton}>
                  <Button
                     href='/menu'
                     content='Volver'
                     color='var(--white)'
                     background='var(--black)'
                  />
               </div>

               <OrderSummary />
            </div>
         </section>
      </ShopLayout>
   );
};

export default CartPage;
