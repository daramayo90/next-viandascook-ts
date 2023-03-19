import { useState } from 'react';
import { NextPage } from 'next';

import { useForm } from 'react-hook-form';

import { validations } from '../../utils';
import { viandasApi } from '../../axiosApi';

import { AuthLayout } from '../../components/layouts';
import { SubmitButton } from '../../components/ui';

import styles from '../../styles/Auth.module.css';

type FormData = {
   email: string;
};

const ForgotPasswordPage: NextPage = () => {
   const [showError, setShowError] = useState<boolean>(false);
   const [success, setSuccess] = useState<boolean>(false);
   const [isClicked, setIsClicked] = useState<boolean>(false);
   const [msg, setMsg] = useState<string>('');

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const onForgetPassword = async ({ email }: FormData) => {
      setIsClicked(true);

      try {
         const { data } = await viandasApi.post('/user/forgot-password', { email });

         if (data) {
            setIsClicked(false);
            setShowError(false);
            setSuccess(true);
            setMsg(data.message);
         }
      } catch (error: any) {
         setIsClicked(false);
         setShowError(true);
         setMsg(error.response.data.message);
      }
   };

   return (
      <AuthLayout title={'Olvidé mi clave'}>
         <section className={styles.auth}>
            <div className={styles.container}>
               <form onSubmit={handleSubmit(onForgetPassword)} noValidate>
                  <label className={styles.inputText}>
                     <span>Correo electrónico:</span>
                     <input
                        {...register('email', {
                           required: 'El email es un campo requerido',
                           validate: validations.isEmail,
                        })}
                        placeholder='email@ejemplo.com'
                     />
                     {errors.email && <span className={styles.error}>{errors.email?.message}</span>}
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

export default ForgotPasswordPage;
