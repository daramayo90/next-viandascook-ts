import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { useRouter } from 'next/router';

import { authOptions } from '../../pages/api/auth/[...nextauth]';

import { ShopLayout } from '../../components/layouts';
import { LoginForm, Providers } from '../../components/auth';
import { CommonQuestions } from '../../components/ui';

import styles from '../../styles/Auth.module.css';

const LoginCheckoutPage: NextPage = () => {
   const router = useRouter();

   const navigateTo = (url: string) => {
      router.push(url);
   };

   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.auth}>
            <div className={styles.container}>
               {/* <h2 className={styles.title}>Detalles del Pago</h2> */}

               <p className={styles.text}>
                  Si ya tenés tu usuario completalo para seguir al próximo paso o hacé click en
                  <strong> quiero comprar sin cuenta</strong> para avanzar.
               </p>

               <LoginForm />

               <span className={styles.textProviders}>Continuar con..</span>

               <Providers />

               <div className={styles.guestButton} onClick={() => navigateTo('/checkout')}>
                  <button>Quiero comprar sin cuenta</button>
               </div>
            </div>
            <CommonQuestions />
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
   const session: any = await unstable_getServerSession(req, res, authOptions);

   const { page = '/checkout' } = query;

   if (session) {
      return {
         redirect: {
            destination: page.toString(),
            permanent: false,
         },
      };
   }

   return {
      props: {},
   };
};

export default LoginCheckoutPage;
