import { useOrderSummaryts } from '../../hooks';
import { currency, zipcodesBA } from '../../utils';

import styles from '../../styles/OrderSummary.module.css';

export const Shipping = () => {
   const {
      shipping,
      zipcode,
      shippingErrors,
      calculateAddress,
      handleCalculation,
      handeZipcode,
      setCalculateAddress,
   } = useOrderSummaryts();

   return (
      <div className={styles.shipping}>
         {shipping === 0 ? (
            <span className={styles.pointer} onClick={() => setCalculateAddress(!calculateAddress)}>
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
                  <option value='CABA'>CABA</option>
                  <option value='Buenos Aires'>Buenos Aires</option>
               </select>

               {zipcode && (
                  <select name='zipcode' className={shippingErrors ? `${styles.selectError}` : ''}>
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
   );
};
