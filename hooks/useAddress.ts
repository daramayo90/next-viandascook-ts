import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

import { IUser } from '../interfaces';
import { AuthContext, CartContext, OrdersContext } from '../context';

type FormData = {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zipcode: string;
   city: 'CABA' | 'Buenos Aires';
   city2: string;
   phone: string;
   email: string;
   dni: string;
};

export const useAddress = (userdb?: IUser) => {
   const { addGuestAddress } = useContext(OrdersContext);
   const { updateAddress } = useContext(AuthContext);
   const { removeCoupon } = useContext(CartContext);

   const [showError, setShowError] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const [showModal, setShowModal] = useState(false);

   const router = useRouter();

   // Get info from database or save in cookies for user guests
   const getAddress = (): FormData => {
      if (userdb) {
         return {
            firstName: userdb.name,
            lastName: userdb.lastName,
            address: userdb.shipping?.address || '',
            address2: userdb.shipping?.address2 || '',
            zipcode: userdb.shipping?.zipcode || '',
            city: userdb.shipping?.city || 'CABA',
            city2: userdb.shipping?.city2 || '',
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
            city: Cookies.get('city') === 'CABA' ? 'CABA' : 'Buenos Aires',
            city2: Cookies.get('city2') || '',
            phone: Cookies.get('phone') || '',
            email: Cookies.get('email') || '',
            dni: Cookies.get('dni') || '',
         };
      }
   };

   const {
      reset,
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: getAddress(),
   });

   const onSubmitAddress = async (data: FormData) => {
      removeCoupon();

      if (!userdb) {
         addGuestAddress(data);
      }

      setIsClicked(true);

      if (userdb) {
         const { err, msg } = await updateAddress(data);

         if (err) {
            setIsClicked(false);
            setShowError(true);
            setErrorMessage(msg!);
            setTimeout(() => setShowError(false), 3500);
            return;
         }
      }

      if (router.asPath.includes('/checkout')) router.replace('/checkout');

      if (router.asPath.includes('/mi-cuenta')) router.replace('/mi-cuenta');
   };

   const openAddressModal = () => {
      Cookies.set('isModalShown', 'false');
      setShowModal(true);
   };

   const closeAddressModal = () => {
      Cookies.set('isModalShown', 'true');
      setShowModal(false);
   };

   return {
      errors,
      showError,
      errorMessage,
      isClicked,
      showModal,
      reset,
      register,
      getValues,
      handleSubmit,
      onSubmitAddress,
      openAddressModal,
      closeAddressModal,
   };
};
