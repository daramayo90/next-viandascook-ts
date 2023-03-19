import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import { validations } from '../../utils';
import { viandasApi } from '../../axiosApi';

import { AuthLayout } from '../../components/layouts';
import { SubmitButton } from '../../components/ui';

import styles from '../../styles/Auth.module.css';

type FormData = {
   newPassword: string;
};

const ResetPasswordPage: NextPage = () => {
   const router = useRouter();
   const { token } = router.query;

   const [showError, setShowError] = useState<boolean>(false);
   const [success, setSuccess] = useState<boolean>(false);
   const [isClicked, setIsClicked] = useState<boolean>(false);
   const [msg, setMsg] = useState<string>('');

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const onResetPassword = async ({ newPassword }: FormData) => {
      setIsClicked(true);

      try {
         const { data } = await viandasApi.put('/user/reset-password', { token, newPassword });

         if (data) {
            setIsClicked(false);
            setShowError(false);
            setSuccess(true);
            setMsg(data.message);
            setTimeout(() => {
               router.push('/auth/login');
            }, 3000);
         }
      } catch (error: any) {
         setIsClicked(false);
         setShowError(true);
         setMsg(error.response.data.message);
      }
   };

   return (
      <AuthLayout title={'Resetear mi clave'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <form onSubmit={handleSubmit(onResetPassword)} noValidate>
                  <label className={styles.inputText}>
                     <span>Contraseña:</span>
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

                  <div className={styles.loginButton}>
                     <SubmitButton content='Resetear' isClicked={isClicked} />
                  </div>

                  {showError && (
                     <div style={{ marginTop: '1rem' }}>
                        <span style={{ color: 'var(--error)' }}>{msg}</span>
                     </div>
                  )}

                  {success && (
                     <div style={{ marginTop: '1rem', textAlign: 'center', maxWidth: '420px' }}>
                        <span style={{ color: 'var(--primary)' }}>{msg}</span>
                     </div>
                  )}
               </form>
            </div>
         </section>
      </AuthLayout>
   );
};

export default ResetPasswordPage;
