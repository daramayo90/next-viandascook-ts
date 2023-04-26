import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { viandasApi } from '../../axiosApi';

import { ga, validations } from '../../utils';
import { SubmitButton } from './SubmitButton';

import styles from '../../styles/Newsletter.module.css';

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
      // subscribeUserEvent(email);
      setOkMessage('Ahora eres parte de la comunidad ViandLover. ¡Bienvenido!');
      setTimeout(() => {
         setOkMessage('');
      }, 3000);
   };

   // const subscribeUserEvent = (email: string) => {
   //    ga.event({
   //       action: 'new_subscriber',
   //       category: 'Subscriber',
   //       label: email,
   //    });
   // };

   return (
      <section className={styles.newsletter}>
         <h2 className={styles.title}>Newsletter</h2>
         <p className={styles.text}>
            <strong>Suscribite</strong> y entrá a la comunidad Viandlover
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
