import { NextPage } from 'next';

import { AuthLayout } from '../../components/layouts';
import { Providers, RegisterForm } from '../../components/auth';
import { CommonQuestions } from '../../components/ui';

import styles from '../../styles/Auth.module.css';

const RegisterPage: NextPage = () => {
   return (
      <AuthLayout title={'Registrarse'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <RegisterForm />

               <span className={styles.textProviders}>Registrarse con:</span>

               <Providers />
            </div>

            <CommonQuestions />
         </section>
      </AuthLayout>
   );
};

// export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
//    const session: any = await unstable_getServerSession(req, res, authOptions);

//    const { page = '/' } = query;

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

export default RegisterPage;
