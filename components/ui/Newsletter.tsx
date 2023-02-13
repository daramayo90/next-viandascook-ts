import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { viandasApi } from '../../axiosApi';

import styles from '../../styles/Newsletter.module.css';
import { validations } from '../../utils';
import { SubmitButton } from './SubmitButton';

type FormData = {
   name: string;
   lastName: string;
   email: string;
};

export const Newsletter = () => {
   const [isClicked, setIsClicked] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [okMessage, setOkMessage] = useState('');

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FormData>();

   const subscribeUser = async ({ name, lastName, email }: FormData) => {
      setIsClicked(true);

      const { data } = await viandasApi.post('/mailchimp/newsletter', {
         name,
         lastName,
         email,
      });

      const { error, message } = data;

      if (error) {
         setErrorMessage(message);
         setIsClicked(false);
         return;
      }

      reset();
      setErrorMessage('');
      setIsClicked(false);
      setOkMessage('Ahora eres parte de la comunidad ViandLover. ¡Bienvenido!');
      setTimeout(() => {
         setOkMessage('');
      }, 3000);
   };

   return (
      <section className={styles.newsletter}>
         <h2 className={styles.title}>Newsletter</h2>
         <p className={styles.text}>
            ¿Querés recibir información útil sobre nutrición y estar al día con nuestras novedades?{' '}
            <strong>Suscribite</strong>
         </p>
         <form onSubmit={handleSubmit(subscribeUser)}>
            <input
               {...register('name', { required: 'El nombre es un campo requerido' })}
               placeholder='Nombre'
            />
            {errors.name && <span className={styles.error}>{errors.name?.message}</span>}

            <input
               {...register('lastName', { required: 'El apellido es un campo requerido' })}
               placeholder='Apellido'
            />
            {errors.lastName && <span className={styles.error}>{errors.lastName?.message}</span>}

            <input
               {...register('email', {
                  required: 'El email es un campo requerido',
                  validate: validations.isEmail,
               })}
               placeholder='Correo electrónico'
            />
            {errors.email && <span className={styles.error}>{errors.email?.message}</span>}

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
   );
};
