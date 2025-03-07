import { FC } from 'react';

import { IUser } from '../../interfaces';

import { useAddress } from '../../hooks';
import { validations } from '../../utils';
import { SubmitButton } from '../ui';

import styles from '../../styles/Address.module.css';
import { AddressModal } from '../modals';

interface Props {
   userdb?: IUser;
}

export const AddressForm: FC<Props> = ({ userdb }) => {
   const {
      showModal,
      register,
      handleSubmit,
      onSubmitAddress,
      reset,
      errors,
      isClicked,
      openAddressModal,
      closeAddressModal,
   } = useAddress(userdb);

   return (
      <>
         <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
            <label className={styles.inputText}>
               <span>Nombre</span>
               <input
                  {...register('firstName', {
                     required: 'El nombre es un campo requerido',
                  })}
                  type='text'
               />
               {errors.firstName && <span className={styles.error}>{errors.firstName?.message}</span>}
            </label>

            <label className={styles.inputText}>
               <span>Apellido</span>
               <input
                  {...register('lastName', {
                     required: 'El apellido es un campo requerido',
                  })}
                  type='text'
               />
               {errors.lastName && <span className={styles.error}>{errors.lastName?.message}</span>}
            </label>

            <label className={styles.inputText} onClick={openAddressModal}>
               <span>Dirección</span>
               <input
                  {...register('address', {
                     required: 'La dirección es un campo requerido',
                     minLength: {
                        value: 6,
                        message: 'Debe tener al menos 6 caracteres',
                     },
                  })}
                  type='text'
                  placeholder='Nombre y número de la calle'
               />
               {errors.address && <span className={styles.error}>{errors.address?.message}</span>}
            </label>

            <label className={styles.inputText}>
               <span>Piso/Depto</span>
               <input
                  {...register('address2', {
                     required: 'El Piso/Depto es un campo requerido',
                     minLength: {
                        value: 2,
                        message: 'Debe tener al menos 2 caracteres',
                     },
                  })}
                  type='text'
                  placeholder='Indicar Piso / Depto / Casa'
               />
               {errors.address2 && <span className={styles.error}>{errors.address2?.message}</span>}
            </label>

            <label className={styles.inputText}>
               <span>Ciudad</span>
               <input
                  {...register('city', {
                     required: 'La ciudad es un campo requerido',
                  })}
                  type='text'
                  disabled
               />
               {errors.city && <span className={styles.error}>{errors.city?.message}</span>}
            </label>

            <label className={styles.inputText}>
               <span>Barrio / Localidad</span>
               <input
                  {...register('city2', {
                     required: 'El barrio / localidad es un campo requerido',
                  })}
                  type='text'
                  disabled
               />
               {errors.city2 && <span className={styles.error}>{errors.city2?.message}</span>}
            </label>

            <label className={styles.inputText}>
               <span>Código Postal</span>
               <input
                  {...register('zipcode', {
                     required: 'El código postal es un campo requerido',
                  })}
                  type='text'
                  disabled
               />
               {errors.zipcode && <span className={styles.error}>{errors.zipcode?.message}</span>}
            </label>

            <label className={styles.inputText}>
               <span>Celular</span>
               <input
                  {...register('phone', {
                     required: 'El teléfono es un campo requerido',
                     validate: validations.isPhone,
                  })}
                  type='number'
                  placeholder='Con 11 y sin 15'
               />
               {errors.phone && <span className={styles.error}>{errors.phone?.message}</span>}
            </label>

            {userdb ? (
               <label className={styles.inputText}>
                  <span>Dirección de Correo Electrónico</span>
                  <input {...register('email')} type='text' readOnly />
               </label>
            ) : (
               <label className={styles.inputText}>
                  <span>Dirección de Correo Electrónico</span>
                  <input
                     {...register('email', {
                        required: 'El email es un campo requerido',
                        validate: validations.isEmail,
                     })}
                     type='text'
                  />
                  {errors.email && <span className={styles.error}>{errors.email?.message}</span>}
               </label>
            )}

            <label className={styles.inputText}>
               <span>DNI / CUIT</span>
               <input
                  {...register('dni', {
                     required: 'El dni es un campo requerido',
                  })}
                  type='number'
               />
               {errors.dni && <span className={styles.error}>{errors.dni?.message}</span>}
            </label>

            <div className={styles.applyButton}>
               <SubmitButton content='Continuar' isClicked={isClicked} />
            </div>
         </form>

         <AddressModal isOpen={showModal} onClose={closeAddressModal} reset={reset} />
      </>
   );
};
