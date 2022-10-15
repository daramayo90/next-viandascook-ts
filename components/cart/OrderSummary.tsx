import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';

import { CartContext } from '../../context';
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
   const { numberOfItems, subTotal, shipping, total, calculateShipping } = useContext(CartContext);

   const [calculateAddress, setCalculateAddress] = useState(false);
   const [zipcode, setZipcode] = useState(false);

   const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total };

   const handleCalculation = (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const city = e.target.city.value;
      calculateShipping(city);
      setCalculateAddress(!calculateAddress);
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

         {/* TODO: Calcular envío */}
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
                        <select name='zipcode'>
                           <option>Código Postal</option>
                           {zipcodesBA.map((zipcode) => (
                              <option value={zipcode}>{zipcode}</option>
                           ))}
                        </select>
                     )}

                     <div>
                        <button className={styles.calculateButton}>Calcular</button>
                     </div>
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
