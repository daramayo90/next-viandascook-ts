import { FC } from 'react';

import { IOrder } from '../../interfaces';

import styles from '../../styles/Order.module.css';

interface Props {
   order: IOrder;
}

export const TransferTable: FC<Props> = ({ order }) => {
   return (
      <>
         {order.paymentMethod === 'transferencia' && (
            <>
               <p style={{ textAlign: 'center', paddingTop: '6rem' }}>
                  <strong>
                     Te pasamos los datos para que puedas realizar la <u>Transferencia Bancaria</u>
                  </strong>
               </p>
               <table className={styles.transfTable}>
                  <tr>
                     <th>Banco</th>
                     <th>Nombre de la cuenta</th>
                     <th>CBU</th>
                     <th>Alias</th>
                  </tr>
                  <tr>
                     <td>Galicia</td>
                     <td>Viandas Cook SRL</td>
                     <td>0070104020000007169700</td>
                     <td>VIANDAS.COOK.SRL</td>
                  </tr>
               </table>

               <ul className={styles.transfList}>
                  <li>
                     <strong>Banco:</strong> Galicia
                  </li>
                  <li>
                     <strong>Nombre de la cuenta:</strong> Viandas Cook SRL
                  </li>
                  <li>
                     <strong>CBU:</strong> 0070104020000007169700
                  </li>
                  <li>
                     <strong>Alias:</strong> VIANDAS.COOK.SRL
                  </li>
               </ul>
            </>
         )}
      </>
   );
};
