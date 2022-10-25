import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { Providers, RegisterForm } from '../../components/auth';
import { AuthLayout } from '../../components/layouts';
import { CommonQuestions } from '../../components/ui';

import styles from '../../styles/Auth.module.css';

const RegisterPage: NextPage = () => {
   return (
      <AuthLayout title={'Crear nueva cuenta'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <RegisterForm />

               <span className={styles.textProviders}>Continuar con..</span>

               <Providers />
            </div>

            <CommonQuestions />
         </section>
      </AuthLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
   const session = await unstable_getServerSession(req, res, authOptions);

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

export default RegisterPage;
