import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { IUser } from '../../interfaces';

import { CartContext, OrdersContext } from '../../context';
import { SubmitButton } from '../ui';

import styles from '../../styles/Checkout.module.css';

interface Props {
   user?: IUser;
}

declare global {
   interface Window {
      MercadoPago: any;
   }
}

let mp: any;

const addCheckout = () => {
   mp = new window.MercadoPago('APP_USR-e4c644d0-351f-4cb0-ab82-c409d0705cd5', {
      locale: 'es-AR',
   });
};

export const Posting: FC<Props> = ({ user }) => {
   const router = useRouter();

   const { createOrder, createMPOrder } = useContext(OrdersContext);
   const { orderComplete } = useContext(CartContext);

   const [isPosting, setIsPosting] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

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
      const { hasError, message } = await createOrder();

      if (hasError) {
         setIsPosting(false);
         setErrorMsg(message);
         return;
      }

      const { id, error } = await createMPOrder(message);

      if (error) {
         setIsPosting(false);
         setErrorMsg(error);
         return;
      }

      createCheckoutButton(id);

      // orderComplete();

      // router.replace(`/muchas-gracias/${message}`);
   };

   // Create preference when click on checkout button
   const createCheckoutButton = (id: string) => {
      // Initialize the checkout
      console.log('PREFERENCIAAAA', id);
      mp.checkout({
         preference: {
            id: id,
         },
         render: {
            container: '.cho-container', // Class name where the payment button will be displayed
            label: 'Pagar', // Change the payment button text (optional)
         },
      });
   };

   return (
      <div className={styles.submit}>
         {errorMsg && <span className={styles.error}>{errorMsg}</span>}

         <SubmitButton content='Finalizar' isClicked={isPosting} onClick={onCreateOrder} />

         <div className='cho-container'></div>
      </div>
   );
};
