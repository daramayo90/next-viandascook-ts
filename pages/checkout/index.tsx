import { useContext } from 'react';
import { GetServerSideProps, GetStaticProps } from 'next';
import { NextPage } from 'next/types';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';

import { CartMenu, CheckoutSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

import { AuthContext, OrdersContext } from '../../context';

import { RiMapPinFill } from 'react-icons/ri';
import { AiOutlineRight } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';

import styles from '../../styles/Checkout.module.css';
import { dbUsers } from '../../database';
import { IUser } from '../../interfaces';

interface Props {
   user?: IUser;
}

const CheckoutPage: NextPage<Props> = ({ user }) => {
   const { shippingAddress } = useContext(OrdersContext);

   const shipping = user ? user?.shipping : shippingAddress;

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
                           {!shipping ? (
                              <p className={styles.text}>Datos de envío</p>
                           ) : (
                              <p className={styles.text}>{shipping.address}</p>
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
            </div>
         </section>

         <CartMenu />
      </ShopLayout>
   );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//    const { user }: any = (await getSession({ req })) || '';

//    if (user) {
//       return {
//          props: { user },
//       };
//    }

//    return {
//       props: {},
//    };
// };

export const getStaticProps: GetStaticProps = async () => {
   const { data, status } = useSession();

   if (status === 'authenticated') {
      const user = data.user as IUser;

      return {
         props: { user },
      };
   }

   return {
      props: {},
   };
};

export default CheckoutPage;
