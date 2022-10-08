import { useEffect, useState } from 'react';
import { getProviders } from 'next-auth/react';

import { useForm } from 'react-hook-form';

export type FormData = {
   name: string;
   lastName: string;
   email: string;
   password: string;
};

export const useAuth = () => {
   const [providers, setProviders] = useState<any>({});
   const [showError, setShowError] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   useEffect(() => {
      getProviders().then((prov) => setProviders(prov));
   }, []);

   return { providers, showError, setShowError, register, handleSubmit, errors };
};
