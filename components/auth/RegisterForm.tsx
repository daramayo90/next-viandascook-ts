import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../hooks';

import { SubmitButton } from '../ui';

import { validations } from '../../utils';

import styles from '../../styles/Auth.module.css';

export const RegisterForm = () => {
   const router = useRouter();

   const { showError, register, handleSubmit, errors, errorMessage, onRegisterForm, isClicked } =
      useAuth();

   return (
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
         <div className={styles.userNames}>
            <label className={styles.inputText}>
               <span>Nombre</span>
               <input
                  {...register('name', { required: 'El nombre es un campo requerido' })}
                  placeholder='Juan'
               />
               {errors.name && <span className={styles.error}>{errors.name?.message}</span>}
            </label>

            <label className={styles.inputText}>
               <span>Apellido</span>
               <input
                  {...register('lastName', { required: 'El apellido es un campo requerido' })}
                  placeholder='Perez'
               />
               {errors.lastName && <span className={styles.error}>{errors.lastName?.message}</span>}
            </label>
         </div>

         <label className={styles.inputText}>
            <span>Correo electrónico</span>
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
            <span>Contraseña</span>
            <input
               {...register('password', {
                  required: 'La contraseña es un campo requerido',
                  minLength: {
                     value: 6,
                     message: 'Debe tener al menos 6 caracteres',
                  },
               })}
               type='password'
            />
            {errors.password && <span className={styles.error}>{errors.password?.message}</span>}
         </label>

         <div className={styles.linksTo}>
            <div className={styles.login}>
               <Link href={`/auth/login?page=${router.query.page?.toString()}`}>
                  <span>Ya tengo cuenta</span>
               </Link>
            </div>

            <div className={styles.registerButton}>
               <SubmitButton content='Registrarse' isClicked={isClicked} />
            </div>
         </div>

         <div className={showError ? `${styles.errorMessage} fadeIn` : 'noDisplay'}>
            <span>Corrige los errores antes de continuar</span>
         </div>

         <div className={errorMessage ? `${styles.errorMessage} fadeIn` : 'noDisplay'}>
            <span>{errorMessage}</span>
         </div>
      </form>
   );
};
