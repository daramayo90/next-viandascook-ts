import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import { viandasApi } from '../../axiosApi';

import { IPaymentMethods } from '../../interfaces/order';

import { AuthContext, CartContext, OrdersContext } from '../../context';
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

const addMailchmpCustomer = async (orderId: string) => {
   try {
      await viandasApi.post('/mailchimp/add-customer', { orderId });
   } catch (error) {
      console.log(error);
   }
};

const addMailchimpOrder = async (orderId: string) => {
   try {
      await viandasApi.post('/mailchimp/add-order', { orderId });
   } catch (error) {
      console.log(error);
   }
};

const removeAbandonedCart = async (email: string) => {
   try {
      await viandasApi.delete('/mailchimp/abandoned-cart', { data: { email } });
   } catch (error) {
      console.log(error);
   }
};

export const Posting: FC = () => {
   const router = useRouter();

   const { createOrder, createMPOrder, addMailchimpClient } = useContext(OrdersContext);
   const { updatePaymentMethod } = useContext(CartContext);
   const { user } = useContext(AuthContext);

   const email = user ? user.email : Cookies.get('email') || '';

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

      updatePaymentMethod(paymentMethod);
   }, []);

   const onCreateOrder = async () => {
      setIsPosting(true);

      const { hasError, message, token = '' } = await createOrder(paymentMethod);

      if (hasError) {
         setIsPosting(false);
         setErrorMsg(message);
         return;
      }

      await addMailchimpClient(message);
      await addMailchmpCustomer(message);
      await removeAbandonedCart(email);

      if (paymentMethod !== 'mercadopago') {
         await addMailchimpOrder(message);
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

   // const isMobile = () => {
   //    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
   //       navigator.userAgent,
   //    );
   // };

   // Create preference when click on checkout button
   const createCheckoutButton = (id: string, init_point: string) => {
      mpRef.current?.checkout({
         preference: {
            id,
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
      updatePaymentMethod(event.target.value as IPaymentMethods);
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

         <SubmitButton content='Finalizar Compra' isClicked={isPosting} onAsyncClick={onCreateOrder} />

         <div className='cho-container'></div>
      </div>
   );
};
