import { useContext } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { AuthContext } from '../../context/auth';

import { FormData, useAuth } from '../../hooks';

import { SubmitButton } from '../ui';

import { validations } from '../../utils';

import styles from '../../styles/Auth.module.css';

export const RegisterForm = () => {
   const router = useRouter();

   const { registerUser } = useContext(AuthContext);

   const { showError, setShowError, register, handleSubmit, errors } = useAuth();

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
               <input {...register('lastName', { required: true })} placeholder='Apellido' />
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
   );
};
