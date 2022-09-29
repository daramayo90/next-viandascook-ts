import { useContext, useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context/auth';

import { AuthLayout } from '../../components/layouts';
import { CommonQuestions, SubmitButton } from '../../components/ui';
import { validations } from '../../utils';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

import styles from '../../styles/Auth.module.css';

type FormData = {
   name: string;
   lastName: string;
   email: string;
   password: string;
};

const RegisterPage = () => {
   const router = useRouter();
   const { registerUser } = useContext(AuthContext);

   const [providers, setProviders] = useState<any>({});
   const [showError, setShowError] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   useEffect(() => {
      getProviders().then((prov) => setProviders(prov));
   }, []);

   const onRegisterForm = async (newUser: FormData) => {
      setShowError(false);
      const hasError = await registerUser(newUser);

      if (hasError) {
         setShowError(true);
         setTimeout(() => setShowError(false), 3500);
         return;
      }

      const { email, password } = newUser;

      await signIn('credentials', { email, password });
   };

   return (
      <AuthLayout title={'Crear nueva cuenta'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                  <h1 className={styles.title}>Registrarse</h1>

                  <div className={styles.userNames}>
                     <label className={styles.inputText}>
                        <input {...register('name', { required: true })} placeholder='Nombre' />
                        {errors.name && (
                           <span className={styles.error}>El nombre es un campo requerido</span>
                        )}
                     </label>

                     <label className={styles.inputText}>
                        <input
                           {...register('lastName', { required: true })}
                           placeholder='Apellido'
                        />
                        {errors.lastName && (
                           <span className={styles.error}>El apellido es un campo requerido</span>
                        )}
                     </label>
                  </div>

                  <label className={styles.inputText}>
                     <input
                        {...register('email', { required: true, validate: validations.isEmail })}
                        placeholder='email@ejemplo.com'
                     />
                     {errors.email && (
                        <span className={styles.error}>El email es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <input
                        {...register('password', {
                           required: true,
                           minLength: {
                              value: 6,
                              message: 'Debe tener al menos 6 caracteres',
                           },
                        })}
                        placeholder='Contraseña'
                     />
                     {errors.password && (
                        <span className={styles.error}>La contraseña es un campo requerido</span>
                     )}
                  </label>

                  <div className={styles.linksTo}>
                     <div className={styles.login}>
                        <Link href={`/auth/login?page=${router.query.page?.toString()}`}>
                           <span>Ya tengo cuenta</span>
                        </Link>
                     </div>

                     <div className={styles.registerButton}>
                        <SubmitButton
                           content='Registrarse'
                           border='1px solid var(--secondary)'
                           color='var(--white)'
                           background='var(--secondary)'
                        />
                     </div>
                  </div>

                  <div className={showError ? `${styles.errorMessage} fadeIn` : 'noDisplay'}>
                     <span>Corrige los errores antes de continuar</span>
                  </div>
               </form>

               <span className={styles.textProviders}>Continuar con..</span>

               <div className={styles.providersContainer}>
                  <div className={styles.providers}>
                     {Object.values(providers).map((provider: any) => {
                        if (provider.id === 'credentials') return <div key='credentials'></div>;

                        if (provider.name === 'Google')
                           return (
                              <button
                                 key={provider.id}
                                 className={`${styles.providerButton} ${styles.google}`}
                                 onClick={() => signIn(provider.id)}>
                                 <FcGoogle className={styles.icon} />
                              </button>
                           );

                        return (
                           <button
                              key={provider.id}
                              className={`${styles.providerButton} ${styles.facebook}`}
                              onClick={() => signIn(provider.id)}>
                              <FaFacebookF className={styles.icon} />
                           </button>
                        );
                     })}
                  </div>
               </div>
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

export default RegisterPage;
