import { FormEvent, useContext, useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { AuthContext } from '../context';
import { useRouter } from 'next/router';

export type FormData = {
   name: string;
   lastName: string;
   email: string;
   password: string;
};

export const useAuth = () => {
   const router = useRouter();

   const [providers, setProviders] = useState<any>({});
   const [showError, setShowError] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const { registerUser } = useContext(AuthContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   useEffect(() => {
      getProviders().then((prov) => setProviders(prov));
   }, []);

   // Register new user
   const onRegisterForm = async (newUser: FormData) => {
      const { hasError, message } = await registerUser(newUser);

      if (hasError) {
         setShowError(true);
         setErrorMessage(message!);
         setTimeout(() => setShowError(false), 3500);
         return;
      }

      setIsClicked(true);

      const { email, password } = newUser;

      await signIn('credentials', { email, password });
   };

   // Login user
   const onLoginUser = async ({ email, password }: FormData) => {
      setIsClicked(true);

      const res = await signIn('credentials', { redirect: false, email, password });

      if (res!.ok === false) return setShowError(true);

      return await signIn('credentials', { email, password });
   };

   return {
      providers,
      isClicked,
      showError,
      errors,
      errorMessage,
      setShowError,
      register,
      handleSubmit,
      setErrorMessage,
      onRegisterForm,
      onLoginUser,
   };
};
