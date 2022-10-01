import { MainLayout } from '../../components/layouts';

import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

import styles from '../../styles/EmptyCart.module.css';
import { Button } from '../../components/ui';

const EmptyPage = () => {
   return (
      <MainLayout title={'Carrito vacío'} pageDescription={''}>
         <section className={styles.emptyCart}>
            <MdOutlineRemoveShoppingCart className={styles.icon} />

            <div className={styles.container}>
               <h1>Tu carrito está vacío</h1>

               <div>
                  <Button
                     href='/menu'
                     content='Volver'
                     background='var(--black)'
                     color='var(--white)'
                  />
               </div>
            </div>
         </section>
      </MainLayout>
   );
};

export default EmptyPage;
