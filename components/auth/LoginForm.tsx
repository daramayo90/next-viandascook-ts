import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { FormData, useAuth } from '../../hooks';

import { SubmitButton } from '../ui';

import { validations } from '../../utils';

import styles from '../../styles/Auth.module.css';

export const LoginForm = () => {
   const router = useRouter();

   const { showError, setShowError, register, handleSubmit, errors } = useAuth();

   const onLoginUser = async ({ email, password }: FormData) => {
      setShowError(false);
      await signIn('credentials', { email, password });
   };

   return (
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
         <h1 className={styles.title}>Iniciar Sesión</h1>

         <label className={styles.inputText}>
            <input
               {...register('email', { required: true, validate: validations.isEmail })}
               placeholder='email@ejemplo.com'
            />
            {errors.email && <span className={styles.error}>El email es un campo requerido</span>}
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
               type='password'
               placeholder='Contraseña'
            />
            {errors.password && (
               <span className={styles.error}>La contraseña es un campo requerido</span>
            )}
         </label>

         <div className={styles.linksTo}>
            <div className={styles.register}>
               <Link href={`/auth/register?page=${router.query.page?.toString()}`}>
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
   );
};
