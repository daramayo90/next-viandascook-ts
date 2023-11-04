import { ChangeEvent, useContext, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useRouter } from 'next/router';

import { dbOrders, dbUsers } from '../../database';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts';
import { SubmitButton } from '../../components/ui';

import styles from '../../styles/ApplyReferralCoupon.module.css';

interface Props {
   message?: string;
}

const ReferralPage: NextPage<Props> = ({ message }) => {
   const [isClicked, setIsClicked] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');
   const [correctMsg, setCorrectMsg] = useState('');

   const router = useRouter();

   const { onUseRefCoupon } = useContext(CartContext);

   const onApplyReferralCoupon = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsClicked(true);
      setErrorMsg('');
      setCorrectMsg('');

      const refCoupon = e.target.refcoupon.value;

      if (refCoupon.length <= 0) {
         setIsClicked(false);
         setErrorMsg('No se indicó ningún cupón');
         setTimeout(() => {
            setErrorMsg('');
         }, 2500);
         return;
      }

      const { error, msg } = await onUseRefCoupon(refCoupon);

      if (error) {
         setIsClicked(false);
         setErrorMsg(msg!);
         setTimeout(() => {
            setErrorMsg('');
         }, 2500);
         return;
      }

      setIsClicked(false);
      setCorrectMsg('Cupón aplicado correctamente. Redirigiendo...');

      setTimeout(() => {
         router.push('/checkout');
      }, 2000);
   };

   if (message) {
      return (
         <ShopLayout title={'Cupón Referido | Viandas Cook'} pageDescription={''} noIndex>
            <section className={styles.applyReferral}>
               <div className={styles.container}>
                  <h2 className={styles.title}>{message}</h2>
               </div>
            </section>
         </ShopLayout>
      );
   }

   return (
      <ShopLayout title={'Viandas Cook - Cupón Referido'} pageDescription={''}>
         <section className={styles.applyReferral}>
            <div className={styles.container}>
               <h2 className={styles.title}>Cupón de Referido</h2>

               <p className={styles.text}>
                  A continuación, podrás usar el <strong>cupón</strong> que te compartió tu amigo. Este
                  cupón se puede utilizar en combinación con otros cupones
               </p>

               <form className={styles.applyCoupon} onSubmit={onApplyReferralCoupon}>
                  <label>
                     <p>Usar cupón:</p>
                     <input type='text' name='refcoupon' placeholder='Cupón referido' />
                  </label>
                  <div className={styles.btn}>
                     <SubmitButton content='Aplicar' isClicked={isClicked} />
                  </div>
               </form>

               {errorMsg && <span className={styles.error}>{errorMsg}</span>}
               {correctMsg && <span className={styles.correct}>{correctMsg}</span>}
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const session: any = await getServerSession(req, res, authOptions);

   if (!session)
      return {
         props: { message: 'Debes estar logueado para acceder a esta sección' },
      };

   const user = await dbUsers.getUser(session.user.email);

   if (!user)
      return {
         props: { message: 'Debes estar logueado para acceder a esta sección' },
      };

   const userOrders = await dbOrders.getOrdersByUser(user.email);

   if (userOrders.length > 0)
      return {
         props: {
            message:
               'El cupón de referidos sólo es válido como primera compra, y ya tenemos compras registradas con tu usuario',
         },
      };

   return {
      props: {},
   };
};

export default ReferralPage;
