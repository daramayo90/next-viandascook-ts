import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AuthContext, CartContext } from '../context';

export const useOrderSummaryts = () => {
   const router = useRouter();

   const { user } = useContext(AuthContext);
   const { numberOfItems, subTotal, shipping, total, calculateShipping } = useContext(CartContext);

   const [zipcode, setZipcode] = useState(false);
   const [canSubmit, setCanSubmit] = useState(false);
   const [submitErrors, setSubmitErrors] = useState(false);
   const [shippingErrors, setShippingErrors] = useState(false);
   const [calculateAddress, setCalculateAddress] = useState(false);

   useEffect(() => {
      if (user) calculateShipping(user.shipping.city);
   }, [user]);

   useEffect(() => {
      if (shipping === 0 && numberOfItems < 14) return setCanSubmit(false);

      setCanSubmit(true);
   }, [shipping, numberOfItems]);

   const summaryValues = { numberOfItems, subTotal, total };

   const handleCalculation = (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const city = e.target.city.value;
      const zipcode = e.target.zipcode?.value || '';

      if (zipcode === 'Código Postal') return setShippingErrors(true);

      calculateShipping(city);
      setCalculateAddress(!calculateAddress);
      setZipcode(false);
      setShippingErrors(false);
   };

   const handeZipcode = (e: ChangeEvent<HTMLSelectElement>) => {
      const city = e.target.value;

      if (city === 'ba') return setZipcode(true);

      setZipcode(false);
   };

   const handleSubmit = () => {
      if (!canSubmit) return setSubmitErrors(true);

      setSubmitErrors(false);

      router.push('/auth/login-checkout');
   };

   return {
      shipping,
      zipcode,
      submitErrors,
      shippingErrors,
      summaryValues,
      calculateAddress,
      handleCalculation,
      handeZipcode,
      handleSubmit,
      setCalculateAddress,
   };
};
