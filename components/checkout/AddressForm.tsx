import { ChangeEvent, FC, useState } from 'react';

import { IUser } from '../../interfaces';

import { useAddress } from '../../hooks';
import { validations, zipcodesBA } from '../../utils';
import { SubmitButton } from '../ui';

import styles from '../../styles/Address.module.css';

interface Props {
   userdb?: IUser;
}

export const AddressForm: FC<Props> = ({ userdb }) => {
   const { register, getValues, handleSubmit, onSubmitAddress, errors, isClicked } =
      useAddress(userdb);

   const [cityValue, setCityValue] = useState<string>(getValues('city'));

   const onCitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      setCityValue(e.target.value);
   };

   return (
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

         <label className={styles.inputText}>
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
            <span>Localidad / Ciudad</span>
            <select
               {...register('city', {
                  required: 'La ciudad es un campo requerido',
               })}
               onChange={onCitySelect}>
               <option value='CABA'>CABA</option>
               <option value='Buenos Aires'>Buenos Aires</option>
            </select>
            {errors.city && <span className={styles.error}>{errors.city?.message}</span>}
         </label>

         {cityValue === 'CABA' ? (
            <label className={styles.inputText}>
               <span>Código Postal</span>
               <input
                  {...register('zipcode', {
                     required: 'El código postal es un campo requerido',
                  })}
                  type='number'
               />
               {errors.zipcode && <span className={styles.error}>{errors.zipcode?.message}</span>}
            </label>
         ) : (
            <label className={styles.inputText}>
               <span>Código Postal</span>
               <select
                  {...register('zipcode', {
                     required: 'El código postal es un campo requerido',
                  })}>
                  {zipcodesBA.map((zipcode, index) => (
                     <option key={index} value={zipcode}>
                        {zipcode}
                     </option>
                  ))}
               </select>
               {errors.zipcode && <span className={styles.error}>{errors.zipcode?.message}</span>}
            </label>
         )}

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
   );
};
