import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { IUser } from '../../interfaces';

import { CartContext, OrdersContext } from '../../context';
import { SubmitButton } from '../ui';

import styles from '../../styles/Checkout.module.css';

interface Props {
   user?: IUser;
}

export const Posting: FC<Props> = ({ user }) => {
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

      router.replace(`/muchas-gracias/${message}`);
   };

   return (
      <div className={styles.submit}>
         {errorMsg && <span className={styles.error}>{errorMsg}</span>}

         <SubmitButton content='Finalizar' isClicked={isPosting} onClick={onCreateOrder} />
      </div>
   );
};
