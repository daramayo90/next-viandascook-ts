import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { CartContext, OrdersContext } from '../../context';

import styles from '../../styles/Checkout.module.css';

export const Posting = () => {
   const router = useRouter();

   const { createOrder } = useContext(OrdersContext);
   const { orderComplete } = useContext(CartContext);

   const [isPosting, setIsPosting] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const onCreateOrder = async () => {
      setIsPosting(true);
      const { hasError, message } = await createOrder();

      if (hasError) {
         setIsPosting(false);
         setErrorMsg(message);
         return;
      }

      orderComplete();
      router.replace(`/pedidos/${message}`);
   };
   return (
      <>
         <button disabled={isPosting} onClick={onCreateOrder}>
            Finalizar Compra
         </button>

         {errorMsg && <span className={styles.error}>{errorMsg}</span>}
      </>
   );
};
