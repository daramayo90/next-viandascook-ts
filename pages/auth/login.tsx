import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { LoginForm, Providers } from '../../components/auth';
import { AuthLayout } from '../../components/layouts';
import { CommonQuestions } from '../../components/ui';

import styles from '../../styles/Auth.module.css';

const LoginPage: NextPage = () => {
   return (
      <AuthLayout title={'Iniciar Sesión'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <LoginForm />

               <span className={styles.textProviders}>Continuar con..</span>

               <Providers />
            </div>

            <CommonQuestions />
         </section>
      </AuthLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   const session = await getSession({ req });

   const { page = '/' } = query;

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

export default LoginPage;
