import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from '../../pages/api/auth/[...nextauth]';

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

// export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
//    const session: any = await unstable_getServerSession(req, res, authOptions);

//    const { page = '/menu' } = query;

//    if (session) {
//       return {
//          redirect: {
//             destination: page.toString(),
//             permanent: false,
//          },
//       };
//    }

//    return {
//       props: {},
//    };
// };

export default LoginPage;
