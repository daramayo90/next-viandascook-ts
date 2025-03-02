import { NextPage } from 'next';

import { AuthLayout } from '../../components/layouts';
import { LoginForm, Providers } from '../../components/auth';
import { CommonQuestions } from '../../components/ui';

import styles from '../../styles/Auth.module.css';

const LoginPage: NextPage = () => {
   return (
      <AuthLayout title={'Iniciar Sesión'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <h1 className={styles.title}>Iniciar Sesión</h1>

               <LoginForm />

               {/* <span className={styles.textProviders}>Loguearse o Crear Cuenta con:</span> */}

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
