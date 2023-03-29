import { NextPage } from 'next';

import { AuthLayout } from '../../components/layouts';
import { LoginForm } from '../../components/auth';

import styles from '../../styles/Auth.module.css';

const LoginViandasCookPage: NextPage = () => {
   return (
      <AuthLayout title={'Iniciar Sesión'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <LoginForm />
            </div>
         </section>
      </AuthLayout>
   );
};

export default LoginViandasCookPage;
