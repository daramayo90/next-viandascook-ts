import { useContext, useState } from 'react';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { CartContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import { SubmitButton } from '../../components/ui';

import { RiUserFill } from 'react-icons/ri';
import { TbDiscount2 } from 'react-icons/tb';
import { MdDeliveryDining, MdLocalOffer } from 'react-icons/md';

import styles from '../../styles/Promos.module.css';

const PromosPage: NextPage = () => {
   const router = useRouter();

   const { addCoupon } = useContext(CartContext);

   const [errorMsg, setErrorMsg] = useState('');

   const onNewUser = async () => {
      const { error, msg } = await addCoupon('bienvenido10');

      if (error) return setErrorMsg(msg!);

      setErrorMsg('');
      router.push('/checkout');
   };

   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.promos}>
            <div className={styles.container}>
               {/* New User Promo */}
               <div className={styles.promo} onClick={onNewUser}>
                  <div className={styles.card}>
                     <RiUserFill className={styles.iconPromo} />

                     <div className={styles.info}>
                        <p className={styles.title}>Nuevo Usuario</p>
                        <p className={styles.text}>Válido para la primera compra</p>
                     </div>
                  </div>
               </div>

               {errorMsg && <span className={styles.error}>{errorMsg}</span>}

               {/* Discount 20% Off */}
               <div className={styles.promo}>
                  <div className={styles.card}>
                     <TbDiscount2 className={styles.iconPromo} />

                     <div className={styles.info}>
                        <p className={styles.title}>20% OFF</p>
                        <p className={styles.text}>20% de descuento en todos el menú</p>
                     </div>
                  </div>
               </div>

               {/* Free Delivery Fee */}
               <div className={styles.promo}>
                  <div className={styles.card}>
                     <MdDeliveryDining className={styles.iconPromo} />

                     <div className={styles.info}>
                        <p className={styles.title}>Delivery Gratis</p>
                        <p className={styles.text}>Envío gratis llevando 14 viandas o más</p>
                     </div>
                  </div>
               </div>

               {/* Weekend Special */}
               <div className={styles.promo}>
                  <div className={styles.card}>
                     <MdLocalOffer className={styles.iconPromo} />

                     <div className={styles.info}>
                        <p className={styles.title}>Especial Fin de Semana</p>
                        <p className={styles.text}>Válido para Sábados y Domingos</p>
                     </div>
                  </div>
               </div>

               {/* Year End Promo */}
               <div className={styles.promo}>
                  <div className={styles.card}>
                     <TbDiscount2 className={styles.iconPromo} />

                     <div className={styles.info}>
                        <p className={styles.title}>Promo Fin de Año</p>
                        <p className={styles.text}>Válido para Navidad y Año nuevo</p>
                     </div>
                  </div>
               </div>

               {/* Apply Button */}
               <Link href='/checkout'>
                  <div className={styles.applyButton}>
                     <SubmitButton
                        content='Aplicar'
                        border='1px solid var(--primary)'
                        color='var(--white)'
                        background='var(--primary)'
                     />
                  </div>
               </Link>
            </div>
         </section>
      </ShopLayout>
   );
};

export default PromosPage;
