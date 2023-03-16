import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { IPaymentMethods } from '../../interfaces/order';

import { OrdersContext } from '../../context';
import { SubmitButton } from '../ui';

import styles from '../../styles/Checkout.module.css';

interface Option {
   value: string;
   label: string;
}

declare global {
   interface Window {
      MercadoPago: any;
   }
}

let mp: any;

const options: Option[] = [
   { value: 'efectivo', label: 'Efectivo' },
   { value: 'transferencia', label: 'Transferencia Bancaria' },
   { value: 'mercadopago', label: 'Mercado Pago' },
];

const addCheckout = () => {
   mp = new window.MercadoPago('APP_USR-e4c644d0-351f-4cb0-ab82-c409d0705cd5', {
      locale: 'es-AR',
   });
};

export const Posting: FC = () => {
   const router = useRouter();

   const { createOrder, createMPOrder, addMailchimpClient, addReferralPoints } =
      useContext(OrdersContext);

   const [isPosting, setIsPosting] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const [paymentMethod, setPaymentMethod] = useState<IPaymentMethods>('efectivo');

   useEffect(() => {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.addEventListener('load', addCheckout); // Cuando cargue el script, se ejecutará la función addCheckout
      document.body.appendChild(script);
   }, []);

   const onCreateOrder = async () => {
      setIsPosting(true);

      const { hasError, message } = await createOrder(paymentMethod);

      if (hasError) {
         setIsPosting(false);
         setErrorMsg(message);
         return;
      }

      await addMailchimpClient(message);

      if (paymentMethod !== 'mercadopago') {
         router.replace(`/muchas-gracias/${message}`);
         return;
      }

      const { id, error } = await createMPOrder(message);

      if (error) {
         setIsPosting(false);
         setErrorMsg(error);
         return;
      }

      createCheckoutButton(id);
   };

   // Create preference when click on checkout button
   const createCheckoutButton = (id: string) => {
      // Initialize the checkout
      mp.checkout({
         preference: {
            id: id,
         },
         render: {
            container: '.cho-container', // Class name where the payment button will be displayed
            label: 'Pagar', // Change the payment button text (optional)
         },
         autoOpen: true,
      });

      setIsPosting(false);
      setErrorMsg('');
   };

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod(event.target.value as IPaymentMethods);
   };

   return (
      <div className={styles.submit}>
         {errorMsg && <span className={styles.error}>{errorMsg}</span>}

         <form className={styles.paymentMethods}>
            {options.map((option) => (
               <div key={option.value} className={styles.option}>
                  <input
                     type='radio'
                     id={option.value}
                     name='options'
                     value={option.value}
                     checked={paymentMethod === option.value}
                     onChange={handleChange}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
               </div>
            ))}
         </form>

         <SubmitButton content='Finalizar' isClicked={isPosting} onClick={onCreateOrder} />

         <div className='cho-container'></div>
      </div>
   );
};
