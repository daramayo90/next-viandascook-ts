import { NextPage } from 'next/types';
import Link from 'next/link';

import { CartMenu, CheckoutSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';

import { RiMapPinFill } from 'react-icons/ri';
import { AiOutlineRight } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';

import styles from '../../styles/Checkout.module.css';

const CheckoutPage: NextPage = () => {
   const { shippingAddress } = useContext(CartContext);

   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.checkout}>
            <div className={styles.container}>
               <Link href='/checkout/address'>
                  <div className={styles.deliveryAddress}>
                     <div className={styles.info}>
                        <span className={styles.title}>Enviar a..</span>

                        <div className={styles.address}>
                           <RiMapPinFill className={styles.iconMap} />
                           {!shippingAddress ? (
                              <p className={styles.text}>Datos de envío</p>
                           ) : (
                              <p className={styles.text}>{shippingAddress.address}</p>
                           )}
                           <AiOutlineRight className={styles.iconRight} />
                        </div>
                     </div>
                  </div>
               </Link>

               <Link href='/checkout/promociones'>
                  <div className={styles.discounts}>
                     <div className={styles.info}>
                        <TbDiscount2 className={styles.iconDiscount} />
                        <p className={styles.text}>Ver Descuentos disponibles</p>
                        <AiOutlineRight className={styles.iconRight} />
                     </div>
                  </div>
               </Link>

               <div className={styles.deliveryDate}></div>

               <CheckoutSummary />

               <CartMenu />
            </div>
         </section>
      </ShopLayout>
   );
};

export default CheckoutPage;
