import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { CartContext, OrdersContext } from '../../context';

import styles from '../../styles/Checkout.module.css';
import { SubmitButton } from '../ui';

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
      <div className={styles.submit}>
         {errorMsg && <span className={styles.error}>{errorMsg}</span>}

         <SubmitButton content='Finalizar' isClicked={isPosting} onClick={onCreateOrder} />
      </div>
   );
};
