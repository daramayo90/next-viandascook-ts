import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/EmptyCart.module.css';
import { Button } from '../../components/ui';
import Image from 'next/image';

const EmptyPage = () => {
   return (
      <ShopLayout title={'Carrito vacío'} pageDescription={''}>
         <section className={styles.emptyCart}>
            <div className={styles.icon}>
               <Image src='/img/empty-cart.jpg' width={200} height={200} />
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
