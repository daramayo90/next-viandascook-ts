import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { ShopLayout } from '../../components/layouts';
import { Button } from '../../components/ui';
import { CartContext } from '../../context';

import styles from '../../styles/EmptyCart.module.css';

const EmptyPage: NextPage = () => {
   const router = useRouter();
   const { isLoaded } = useContext(CartContext);

   useEffect(() => {
      if (isLoaded) {
         router.replace('/cart');
      }
   }, [isLoaded, router]);

   // Avoid render anything in client-side
   if (isLoaded) {
      return <></>;
   }

   return (
      <ShopLayout title={'Carrito vacío'} pageDescription={''}>
         <section className={styles.emptyCart}>
            <div className={styles.icon}>
               <Image
                  src='/img/empty-cart.jpg'
                  alt='Carrito vacío'
                  width={200}
                  height={200}
                  priority={true}
               />
            </div>

            <div className={styles.container}>
               <h2 className={styles.title}>Tu carrito está vacío</h2>
               <p>No hay ninguna vianda en el carrito.</p>
               <p>¡Compremos Algo!</p>

               <div className={styles.button}>
                  <Button
                     href='/menu'
                     content='Ver Menu'
                     background='var(--black)'
                     color='var(--white)'
                  />
               </div>
            </div>
         </section>
      </ShopLayout>
   );
};

export default EmptyPage;
