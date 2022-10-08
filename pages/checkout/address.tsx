import { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

import { dbUsers } from '../../database';
import { IUser } from '../../interfaces';

import { AuthContext, OrdersContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import { SubmitButton } from '../../components/ui';

import styles from '../../styles/Address.module.css';

type FormData = {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zipcode: string;
   city: string;
   phone: string;
   email: string;
   dni: string;
};

interface Props {
   userdb?: IUser;
}

const AddressPage: NextPage<Props> = ({ userdb }) => {
   const router = useRouter();

   const { addGuestAddress } = useContext(OrdersContext);
   const { updateAddress } = useContext(AuthContext);

   // Get info from database or save in cookies for user guests
   const getAddress = (): FormData => {
      if (userdb) {
         return {
            firstName: userdb.name,
            lastName: userdb.lastName,
            address: userdb.shipping?.address || '',
            address2: userdb.shipping?.address2 || '',
            zipcode: userdb.shipping?.zipcode || '',
            city: userdb.shipping?.city || '',
            phone: userdb.phone || '',
            email: userdb.email,
            dni: userdb.dni || '',
         };
      } else {
         return {
            firstName: Cookies.get('firstName') || '',
            lastName: Cookies.get('lastName') || '',
            address: Cookies.get('address') || '',
            address2: Cookies.get('address2') || '',
            zipcode: Cookies.get('zipcode') || '',
            city: Cookies.get('city') || '',
            phone: Cookies.get('phone') || '',
            email: Cookies.get('email') || '',
            dni: Cookies.get('dni') || '',
         };
      }
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: getAddress(),
   });

   const onSubmitAddress = (data: FormData) => {
      if (!userdb) {
         addGuestAddress(data);
      } else {
         updateAddress(data);
      }
      router.push('/checkout');
   };

   return (
      <ShopLayout title={'Iniciar Sesión'} pageDescription={''}>
         <section className={styles.address}>
            <div className={styles.container}>
               <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
                  <label className={styles.inputText}>
                     <span>Nombre</span>
                     <input
                        {...register('firstName', {
                           required: true,
                        })}
                     />
                     {errors.firstName && (
                        <span className={styles.error}>El nombre es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Apellido</span>
                     <input
                        {...register('lastName', {
                           required: true,
                        })}
                     />
                     {errors.lastName && (
                        <span className={styles.error}>El apellido es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Dirección</span>
                     <input
                        {...register('address', {
                           required: true,
                        })}
                        placeholder='Nombre y número de la calle'
                     />
                     {errors.address && (
                        <span className={styles.error}>La dirección es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Piso/Depto</span>
                     <input
                        {...register('address2', {
                           required: true,
                        })}
                        placeholder='Indicar Piso / Depto / Casa'
                     />
                     {errors.address2 && (
                        <span className={styles.error}>La dirección 2 es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Localidad / Ciudad</span>
                     <input
                        {...register('city', {
                           required: true,
                        })}
                     />
                     {errors.city && (
                        <span className={styles.error}>La ciudad es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Código Postal</span>
                     <input
                        {...register('zipcode', {
                           required: true,
                        })}
                     />
                     {errors.zipcode && (
                        <span className={styles.error}>El código postal es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Celular</span>
                     <input
                        {...register('phone', {
                           required: true,
                        })}
                        placeholder='Con 11 y sin 15'
                     />
                     {errors.phone && (
                        <span className={styles.error}>El teléfono es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>Dirección de Correo Electrónico</span>
                     <input
                        {...register('email', {
                           required: true,
                        })}
                     />
                     {errors.phone && (
                        <span className={styles.error}>El e-mail es un campo requerido</span>
                     )}
                  </label>

                  <label className={styles.inputText}>
                     <span>DNI / CUIT</span>
                     <input
                        {...register('dni', {
                           required: true,
                        })}
                     />
                     {errors.phone && (
                        <span className={styles.error}>El DNI / CUIT es un campo requerido</span>
                     )}
                  </label>

                  <div className={styles.applyButton}>
                     <SubmitButton
                        content='Continuar'
                        border='1px solid var(--primary)'
                        color='var(--white)'
                        background='var(--primary)'
                     />
                  </div>
               </form>
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const { user }: any = (await getSession({ req })) || '';

   if (!user)
      return {
         props: {},
      };

   const userdb = await dbUsers.getUser(user.email);

   return {
      props: { userdb },
   };
};

export default AddressPage;
