import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';

import { AuthContext, CartContext } from '../../context';

import { SubmitButton } from '../ui';
import { validations, currency } from '../../utils';

import { Discounts, ShippingCalculation } from './';

import Cookies from 'js-cookie';

import styles from '../../styles/OrderSummary.module.css';
import { viandasApi } from '../../axiosApi';
import { useRouter } from 'next/router';

export const OrderSummary: FC = () => {
   const router = useRouter();

   const { shipping, numberOfItems, cart, subTotal, total } = useContext(CartContext);
   const { user } = useContext(AuthContext);

   const customerEmail = user ? user.email : Cookies.get('email') || '';

   const [isValidEmail, setIsValidEmail] = useState(false);
   const [email, setEmail] = useState(customerEmail);

   const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;

      setIsValidEmail(false);
      setEmail(input);

      if (validations.isEmail(event.target.value) === undefined) {
         setIsValidEmail(true);
      }
   };

   const addCartToMailchimp = async () => {
      try {
         await viandasApi.post('/mailchimp/abandoned-cart', { cart, total, email });
      } catch (error) {
         console.log('Abandoned Cart Error', error);
      }
   };

   const handleSubmit = () => {
      router.push('/auth/login-checkout');
   };

   useEffect(() => {
      if (email) {
         setIsValidEmail(true);
         addCartToMailchimp();
      }
   }, []);

   useEffect(() => {
      if (isValidEmail) {
         Cookies.set('email', email);

         addCartToMailchimp();
      }
   }, [cart, email]);

   return (
      <section className={styles.orderSummary}>
         <h2 className={styles.title}>Total del Carrito</h2>

         <div className={styles.summary}>
            <span>N° de Viandas</span>

            <span>
               {numberOfItems} {numberOfItems > 1 ? 'platos' : 'plato'}
            </span>
         </div>

         <div className={styles.summary}>
            <span>Subtotal</span>

            <span>{currency.format(subTotal)}</span>
         </div>

         <Discounts showNoCash />

         {/* <div className={styles.summary}>
            {numberOfItems >= 14 ? (
               <span className={styles.discount}>Envío (14 platos o más)</span>
            ) : (
               <span>Envío</span>
            )}

            {numberOfItems >= 14 ? <span className={styles.discount}>Gratis</span> : <Shipping />}
         </div> */}

         <div className={styles.summary}>
            <span>Envío</span>

            {/* <span>{currency.format(shipping)}</span> */}

            <ShippingCalculation />
         </div>

         <div className={styles.summary}>
            <span>
               <strong>Total:</strong>
            </span>

            <span>
               <strong>{currency.format(total)}</strong>
            </span>
         </div>

         <div className={styles.summaryDiscount}>
            <span>
               Si es tu primera compra, en el próximo paso podrás aplicar tu descuento desde{' '}
               <strong>Ver descuentos disponibles</strong>
            </span>
         </div>

         <form className={styles.cartForm}>
            <label className={styles.inputText}>
               <span>Email:</span>
               <input type='email' value={email} onChange={handleEmailChange} />
            </label>
         </form>

         {numberOfItems < 7 && (
            <span className={styles.error}>
               Para continuar, elige un mínimo de 7 viandas por favor
            </span>
         )}

         {shipping === 0 && <span className={styles.error}>Calcular el envío antes de continuar</span>}

         {!isValidEmail && <span className={styles.error}>Ingresa un email</span>}

         {isValidEmail && numberOfItems >= 7 && shipping !== 0 && (
            <div className={styles.checkoutButton} onClick={handleSubmit}>
               <SubmitButton content='Continuar' />
            </div>
         )}
      </section>
   );
};
