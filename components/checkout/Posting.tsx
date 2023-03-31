import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { IPaymentMethods } from '../../interfaces/order';

import { OrdersContext } from '../../context';
import { SubmitButton } from '../ui';

import styles from '../../styles/Checkout.module.css';

interface Option {
   value: IPaymentMethods;
   label: string;
}

interface MercadoPago {
   new (publicKey: string, options: { locale: string }): MercadoPago;
   checkout: (options: {
      preference: { id: string };
      render: { container: string; label?: string };
      autoOpen: boolean;
   }) => void;
}

declare global {
   interface Window {
      MercadoPago: MercadoPago;
   }
}

const options: Option[] = [
   { value: 'efectivo', label: 'Efectivo' },
   { value: 'transferencia', label: 'Transferencia Bancaria' },
   { value: 'mercadopago', label: 'Mercado Pago' },
];

const addCheckout = (publicKey: string) => {
   const mp = new window.MercadoPago(publicKey, {
      locale: 'es-AR',
   });
   return mp;
};

export const Posting: FC = () => {
   const router = useRouter();

   const { createOrder, createMPOrder, addMailchimpClient } = useContext(OrdersContext);

   const [isPosting, setIsPosting] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const [paymentMethod, setPaymentMethod] = useState<IPaymentMethods>('efectivo');

   const mpRef = useRef<MercadoPago | null>(null);

   useEffect(() => {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.addEventListener('load', () => {
         const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!;
         mpRef.current = addCheckout(publicKey);
      });
      document.body.appendChild(script);
   }, []);

   const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
         navigator.userAgent,
      );
   };

   const onCreateOrder = async () => {
      setIsPosting(true);

      const { hasError, message, token = '' } = await createOrder(paymentMethod);

      if (hasError) {
         setIsPosting(false);
         setErrorMsg(message);
         return;
      }

      await addMailchimpClient(message);

      if (paymentMethod !== 'mercadopago') {
         router.replace(`/muchas-gracias/${message}/?viandasToken=${token}`);
         return;
      }

      const { id, init_point, error } = await createMPOrder(message, token);

      if (error) {
         setIsPosting(false);
         setErrorMsg(error);
         return;
      }

      createCheckoutButton(id, init_point);
   };

   // Create preference when click on checkout button
   const createCheckoutButton = (id: string, init_point: string) => {
      if (isMobile()) {
         const mercadoPagoAppUrl = `mercadopago://checkout?url=${encodeURIComponent(init_point)}`;
         window.location.href = mercadoPagoAppUrl;
      } else {
         // Initialize the checkout for non-mobile devices
         mpRef.current?.checkout({
            preference: {
               id: id,
            },
            render: {
               container: '.cho-container', // Class name where the payment button will be displayed
               label: 'Pagar', // Change the payment button text (optional)
            },
            autoOpen: true,
         });
      }

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
