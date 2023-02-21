import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';

import { viandasApi } from '../../axiosApi';
import { ShopLayout } from '../../components/layouts';
import { SubmitButton } from '../../components/ui';

import styles from '../../styles/Newsletter.module.css';

type FormData = {
   oldPassword: string;
   newPassword: string;
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

   const onChangePassword = async ({ oldPassword, newPassword }: FormData) => {
      setIsClicked(true);

      try {
         const { data } = await viandasApi.patch('/user/changePassword', {
            oldPassword,
            newPassword,
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
         reset();
         setIsClicked(false);
         setErrorMessage(error.response.data.message);
         setTimeout(() => {
            setErrorMessage('');
         }, 3000);
      }
   };

   if (!session) {
      return <></>;
   }

   return (
      <ShopLayout title={'Viandas Cook - Cambiar Clave'} pageDescription={''}>
         <section>
            <h1>Change Password</h1>
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
                        required: 'La contraseña es un campo requerido',
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

               <div className={errorMessage ? `${styles.errorMessage} fadeIn` : 'noDisplay'}>
                  <span>{errorMessage}</span>
               </div>

               <div className={okMessage ? `${styles.okMessage} fadeIn` : 'noDisplay'}>
                  <span>{okMessage}</span>
               </div>

               <div className={styles.btn}>
                  <SubmitButton content='Suscribirse' isClicked={isClicked} />
               </div>
            </form>
         </section>
      </ShopLayout>
   );
};

export default PasswordPage;
