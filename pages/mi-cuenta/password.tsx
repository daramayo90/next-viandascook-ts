import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';

import { viandasApi } from '../../axiosApi';
import { ShopLayout } from '../../components/layouts';
import { SubmitButton } from '../../components/ui';

import styles from '../../styles/Password.module.css';

type FormData = {
   oldPassword: string;
   newPassword: string;
   repeatNewPassword: string;
};

const PasswordPage = () => {
   const session = useSession();
   const [isClicked, setIsClicked] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [okMessage, setOkMessage] = useState('');

   const router = useRouter();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FormData>();

   const onChangePassword = async ({ oldPassword, newPassword, repeatNewPassword }: FormData) => {
      setIsClicked(true);

      try {
         const { data } = await viandasApi.patch('/user/changePassword', {
            oldPassword,
            newPassword,
            repeatNewPassword,
         });

         const { message } = data;

         reset();
         setErrorMessage('');
         setIsClicked(false);
         setOkMessage(message);
         setTimeout(() => {
            setOkMessage('');
            router.back();
         }, 2500);
      } catch (error: any) {
         setIsClicked(false);
         setErrorMessage(error.response.data.message);
         setTimeout(() => {
            setErrorMessage('');
         }, 4000);
      }
   };

   if (!session) {
      return <></>;
   }

   return (
      <ShopLayout title={'Cambiar Clave | Viandas Cook'} pageDescription={''} noIndex>
         <section className={styles.password}>
            <div className={styles.container}>
               <p className={styles.title}>
                  Recordá que la misma debe tener un mínimo de 6 caracteres.
               </p>
               <p className={styles.title}>
                  En caso que te loguees con Google o Facebook, no necesitas cambiar la clave.
               </p>
               <form onSubmit={handleSubmit(onChangePassword)}>
                  <label className={styles.inputText}>
                     <span>Contraseña Actual:</span>
                     <input
                        {...register('oldPassword', {
                           required: 'La contraseña es un campo requerido',
                           minLength: {
                              value: 6,
                              message: 'Debe tener al menos 6 caracteres',
                           },
                        })}
                        type='password'
                     />
                     {errors.oldPassword && (
                        <span className={styles.error}>{errors.oldPassword?.message}</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Contraseña Nueva:</span>
                     <input
                        {...register('newPassword', {
                           required: 'La contraseña nueva es un campo requerido',
                           minLength: {
                              value: 6,
                              message: 'Debe tener al menos 6 caracteres',
                           },
                        })}
                        type='password'
                     />
                     {errors.newPassword && (
                        <span className={styles.error}>{errors.newPassword?.message}</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Repetir Contraseña Nueva:</span>
                     <input
                        {...register('repeatNewPassword', {
                           required: 'La contraseña nueva es un campo requerido',
                           minLength: {
                              value: 6,
                              message: 'Debe tener al menos 6 caracteres',
                           },
                        })}
                        type='password'
                     />
                     {errors.repeatNewPassword && (
                        <span className={styles.error}>{errors.repeatNewPassword?.message}</span>
                     )}
                  </label>

                  <div className={errorMessage ? `${styles.errorMessage} fadeIn` : 'noDisplay'}>
                     <span>{errorMessage}</span>
                  </div>

                  <div className={okMessage ? `${styles.okMessage} fadeIn` : 'noDisplay'}>
                     <span>{okMessage}</span>
                  </div>

                  <div className={styles.btn}>
                     <SubmitButton content='Aceptar' isClicked={isClicked} />
                  </div>
               </form>
            </div>
         </section>
      </ShopLayout>
   );
};

export default PasswordPage;
