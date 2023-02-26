import { ChangeEvent, useContext, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useRouter } from 'next/router';

import { dbUsers } from '../../database';
import { IUser } from '../../interfaces/user';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts';
import { QuestionsLoyalty, SubmitButton } from '../../components/ui';

import styles from '../../styles/Points.module.css';

interface Props {
   user?: IUser;
}

const PointsPage: NextPage<Props> = ({ user }) => {
   const [isClicked, setIsClicked] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');
   const [correctMsg, setCorrectMsg] = useState('');

   const router = useRouter();

   const { onUsePoints, points } = useContext(CartContext);
   const { redeemPoints = 0 } = (user as IUser) || '';

   const onRedeemPoints = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsClicked(true);
      setErrorMsg('');
      setCorrectMsg('');

      const redeemPoints = e.target.points.value;

      if (redeemPoints.length <= 0) {
         setIsClicked(false);
         setErrorMsg('No se indicaron puntos a canjear');
         return;
      }

      const { error, msg } = await onUsePoints(redeemPoints);

      if (error) {
         setIsClicked(false);
         setErrorMsg(msg!);
         return;
      }

      setIsClicked(false);
      setCorrectMsg('Puntos aplicados correctamente. Redirigiendo...');

      setTimeout(() => {
         router.push('/checkout');
      }, 2000);
   };

   return (
      <ShopLayout title={'Viandas Cook - Canjear Puntos'} pageDescription={''}>
         <section className={styles.points}>
            <div className={styles.container}>
               <div className={styles.balance}>
                  <h3 className={styles.title}>Balance Actual</h3>

                  {!points ? (
                     <span className={styles.userPoints}>
                        <strong>{redeemPoints}</strong> Puntos
                     </span>
                  ) : (
                     <span className={styles.userPoints}>
                        <strong>{redeemPoints}</strong> Puntos
                     </span>
                  )}
               </div>

               <div className={styles.minimun}>
                  <span>
                     Para canjear puntos es necesario un mínimo de <strong>$6.000</strong> en el
                     carrito
                  </span>
               </div>

               <form className={styles.redeemPoints} onSubmit={onRedeemPoints}>
                  <label>
                     <p>Canjear Puntos:</p>
                     <input type='number' name='points' placeholder='Puntos a canjear' />
                  </label>
                  <div className={styles.btn}>
                     <SubmitButton content='Canjear' isClicked={isClicked} />
                  </div>
               </form>

               {errorMsg && <span className={styles.error}>{errorMsg}</span>}
               {correctMsg && <span className={styles.correct}>{correctMsg}</span>}

               <div className={styles.conversion}>
                  <span>30 puntos equivalen a $1</span>
               </div>

               <QuestionsLoyalty />
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const session: any = await unstable_getServerSession(req, res, authOptions);

   if (!session)
      return {
         props: {},
      };

   const user = await dbUsers.getUser(session?.user.email);

   return {
      props: { user },
   };
};

export default PointsPage;
