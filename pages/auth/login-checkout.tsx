import { useEffect, useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { ShopLayout } from '../../components/layouts';
import { CommonQuestions, SubmitButton } from '../../components/ui';
import { validations } from '../../utils';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

import styles from '../../styles/AuthCheckout.module.css';

type FormData = {
   email: string;
   password: string;
};

const LoginCheckoutPage: NextPage = () => {
   const router = useRouter();

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

   const onLoginUser = async ({ email, password }: FormData) => {
      setShowError(false);
      await signIn('credentials', { email, password });
   };

   const navigateTo = (url: string) => {
      router.push(url);
   };

   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <h2 className={styles.title}>Detalles del Pago</h2>

               <div className={styles.lineup}>
                  <div className={styles.stage}>1</div>
                  <div className={styles.stage}>2</div>
                  <div className={styles.stage}>3</div>
               </div>

               <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                  <p className={styles.text}>
                     Si ya tenés tu usuario completalo para seguir al próximo paso o hacé click en
                     "quiero comprar sin cuenta" para avanzar.
                  </p>

                  <label className={styles.inputText}>
                     <span>Correo electrónico</span>
                     <input
                        type='text'
                        {...register('email', { required: true, validate: validations.isEmail })}
                     />
                     {errors.email && (
                        <span className={styles.error}>El email es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Contraseña</span>
                     <input
                        type='password'
                        {...register('password', {
                           required: true,
                           minLength: {
                              value: 6,
                              message: 'Debe tener al menos 6 caracteres',
                           },
                        })}
                     />
                     {errors.password && (
                        <span className={styles.error}>La contraseña es un campo requerido</span>
                     )}
                  </label>

                  <div className={styles.linksTo}>
                     <div className={styles.register}>
                        <Link href='/auth/register?page=checkout'>
                           <span>Crear nueva cuenta</span>
                        </Link>
                     </div>

                     <div className={styles.loginButton}>
                        <SubmitButton
                           content='Acceder'
                           border='1px solid var(--secondary)'
                           color='var(--white)'
                           background='var(--secondary)'
                        />
                     </div>
                  </div>

                  <div className={showError ? `${styles.errorMessage} fadeIn` : 'noDisplay'}>
                     <span>Email o contraseña no válidos</span>
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

               <div className={styles.guestButton} onClick={() => navigateTo('/checkout')}>
                  <button>Quiero comprar sin cuenta</button>
               </div>
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   const session = await getSession({ req });

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
