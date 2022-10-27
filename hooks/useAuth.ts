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

      const { email, password } = newUser;

      await signIn('credentials', { email, password });
   };

   // Login user
   const onLoginUser = async ({ email, password }: FormData) => {
      const res = await signIn('credentials', { redirect: false, email, password });

      console.log(res);

      if (res!.ok === false) return setShowError(true);

      setShowError(false);
      const destination = router.query.page?.toString() || '/';
      // router.replace(destination);
   };

   return {
      providers,
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
