import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { AuthLayout } from '../../components/layouts';
import { LoginForm, Providers } from '../../components/auth';
import { CommonQuestions } from '../../components/ui';

import styles from '../../styles/Auth.module.css';

const LoginCheckoutPage: NextPage = () => {
   const router = useRouter();

   const navigateTo = (url: string) => {
      router.push(url);
   };

   return (
      <AuthLayout title={'Iniciar Sesión'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <p className={styles.text}>
                  Si ya tenés cuenta, ingresá tu mail y contraseña.<br></br>También podes hacer
                  click en
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
      </AuthLayout>
   );
};

// export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
//    const session: any = await unstable_getServerSession(req, res, authOptions);

//    const { page = '/checkout' } = query;

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

export default LoginCheckoutPage;
