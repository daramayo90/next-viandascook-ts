import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../hooks';

import { SubmitButton } from '../ui';

import { validations } from '../../utils';

import styles from '../../styles/Auth.module.css';

export const LoginForm = () => {
   const router = useRouter();

   const { showError, register, handleSubmit, errors, onLoginUser } = useAuth();

   return (
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
         {/* <h1 className={styles.title}>Iniciar Sesión</h1> */}

         <label className={styles.inputText}>
            <input
               {...register('email', {
                  required: 'El email es un campo requerido',
                  validate: validations.isEmail,
               })}
               placeholder='email@ejemplo.com'
            />
            {errors.email && <span className={styles.error}>{errors.email?.message}</span>}
         </label>

         <label className={styles.inputText}>
            <input
               {...register('password', {
                  required: 'La contraseña es un campo requerido',
                  minLength: {
                     value: 6,
                     message: 'Debe tener al menos 6 caracteres',
                  },
               })}
               type='password'
               placeholder='Contraseña'
            />
            {errors.password && <span className={styles.error}>{errors.password?.message}</span>}
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
