import { CartMenu, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

import { RiMapPinFill } from 'react-icons/ri';
import { AiOutlineRight } from 'react-icons/ai';

import styles from '../../styles/Checkout.module.css';
import Link from 'next/link';

const CheckoutPage = () => {
   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.checkout}>
            <div className={styles.container}>
               <div className={styles.deliveryAddress}>
                  <div className={styles.info}>
                     <span className={styles.title}>Enviar a..</span>

                     <Link href='/checkout/address'>
                        <div className={styles.address}>
                           <RiMapPinFill className={styles.iconMap} />
                           <p className={styles.text}>Agregar dirección de entrega</p>
                           <AiOutlineRight className={styles.iconRight} />
                        </div>
                     </Link>
                  </div>
               </div>

               <div className={styles.discounts}>
                  <div>Icon</div>
                  <div>Ver Descuentos disponibles</div>
               </div>

               <div className={styles.deliveryDate}></div>

               <OrderSummary />

               <CartMenu />
            </div>
         </section>
      </ShopLayout>
   );
};

export default CheckoutPage;
