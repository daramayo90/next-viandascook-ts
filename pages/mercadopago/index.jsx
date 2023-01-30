import React, { useContext, useEffect } from 'react';
import { viandasApi } from '../../axiosApi';

import { OrdersContext } from '../../context';

let mp;

const items = [
   {
      title: 'Mi producto 1',
      unit_price: 10,
      quantity: 1,
   },
   {
      title: 'Mi producto 2',
      unit_price: 20,
      quantity: 2,
   },
   {
      title: 'Mi producto 3',
      unit_price: 30,
      quantity: 3,
   },
   {
      title: 'Mi producto 4',
      unit_price: 40,
      quantity: 4,
   },
   {
      title: 'Mi producto 5',
      unit_price: 50,
      quantity: 5,
   },
   {
      title: 'Mi producto 6',
      unit_price: 60,
      quantity: 6,
   },
];

const addCheckout = () => {
   mp = new MercadoPago('TEST-1278c5e2-078c-436a-9cb2-ee8488fdb947', {
      locale: 'es-AR',
   });
};

export default function Product() {
   const { createMPOrder } = useContext(OrdersContext);

   useEffect(() => {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.addEventListener('load', addCheckout); // Cuando cargue el script, se ejecutará la función addCheckout
      document.body.appendChild(script);
   }, []);

   const getPreferenceId = async () => {
      const { hasError, message } = await createMPOrder();

      if (hasError) {
         console.log('ERROR!!', message);
         return;
      }

      console.log('MENSAJEEEE', message);

      createCheckoutButton(message);

      // try {
      //    const { data } = await viandasApi.post('/mercadopago', { items });
      //    const { id } = data;
      //    createCheckoutButton(id);
      // } catch (error) {
      //    console.log('No se pudo enviar la data al backend');
      // }
   };

   // Create preference when click on checkout button
   const createCheckoutButton = (preferenceId) => {
      // Initialize the checkout
      console.log('PREFERENCIAAAA', preferenceId);
      mp.checkout({
         preference: {
            id: preferenceId,
         },
         render: {
            container: '.cho-container', // Class name where the payment button will be displayed
            label: 'Pagar', // Change the payment button text (optional)
         },
      });
   };

   return (
      <>
         <button onClick={getPreferenceId} style={{ backgroundColor: 'black' }}>
            Obtener Preference ID
         </button>
         <div className='cho-container'></div>
      </>
   );
}
