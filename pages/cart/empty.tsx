import type { NextPage } from 'next';
import Image from 'next/image';

import { ShopLayout } from '../../components/layouts';
import { Button } from '../../components/ui';

import styles from '../../styles/EmptyCart.module.css';

const EmptyPage: NextPage = () => {
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
