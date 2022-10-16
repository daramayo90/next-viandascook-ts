import { ChangeEvent, FC, useContext, useState, useEffect } from 'react';

import { AuthContext, CartContext } from '../../context';
import { currency, zipcodesBA } from '../../utils';
import { Button } from '../ui';

import styles from '../../styles/OrderSummary.module.css';

interface Props {
   orderValues?: {
      numberOfItems: number;
      subTotal: number;
      total: number;
   };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
   const [zipcode, setZipcode] = useState(false);
   const [shippingErrors, setShippingErrors] = useState(false);
   const [calculateAddress, setCalculateAddress] = useState(false);

   const { user } = useContext(AuthContext);
   const { numberOfItems, subTotal, shipping, total, calculateShipping } = useContext(CartContext);

   useEffect(() => {
      if (user) calculateShipping(user.shipping.city);
      console.log(user?.shipping.city);
   }, [user]);

   const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total };

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

   return (
      <section className={styles.orderSummary}>
         <h2 className={styles.title}>Total del Carrito</h2>

         <div className={styles.summary}>
            <span>N° de Viandas</span>

            <span>
               {summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'platos' : 'plato'}
            </span>
         </div>

         <div className={styles.summary}>
            <span>Subtotal</span>

            <span>{currency.format(summaryValues.subTotal)}</span>
         </div>

         <div className={styles.summary}>
            <span>Envío</span>

            <div className={styles.shipping}>
               {shipping === 0 ? (
                  <span
                     className={styles.pointer}
                     onClick={() => setCalculateAddress(!calculateAddress)}>
                     Calcular envío
                  </span>
               ) : (
                  <>
                     <span>{currency.format(shipping)}</span>

                     <span
                        className={styles.pointer}
                        onClick={() => setCalculateAddress(!calculateAddress)}>
                        Recalcular
                     </span>
                  </>
               )}

               {calculateAddress && (
                  <form className={styles.formCalculation} onSubmit={handleCalculation}>
                     <select name='city' onChange={handeZipcode}>
                        <option>Localidad</option>
                        <option value='caba'>CABA</option>
                        <option value='ba'>Buenos Aires</option>
                     </select>

                     {zipcode && (
                        <select
                           name='zipcode'
                           className={shippingErrors ? `${styles.selectError}` : ''}>
                           <option>Código Postal</option>
                           {zipcodesBA.map((zipcode, index) => (
                              <option key={index} value={zipcode}>
                                 {zipcode}
                              </option>
                           ))}
                        </select>
                     )}

                     {shippingErrors && <span className={styles.error}>Indicar Cód. Postal</span>}

                     <button className={styles.calculateButton}>Calcular</button>
                  </form>
               )}
            </div>
         </div>

         <div className={styles.summary}>
            <span>
               <strong>Total:</strong>
            </span>

            <span>
               <strong>{currency.format(summaryValues.total)}</strong>
            </span>
         </div>

         <div className={styles.checkoutButton}>
            <Button
               href='/auth/login-checkout'
               content='Finalizar'
               background='var(--black)'
               color='var(--white)'
            />
         </div>
      </section>
   );
};
