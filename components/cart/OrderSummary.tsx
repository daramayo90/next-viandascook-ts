import { FC, useContext } from 'react';

import { CartContext } from '../../context';

import { currency } from '../../utils';

interface Props {
   orderValues?: {
      numberOfItems: number;
      subTotal: number;
      total: number;
   };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
   const { numberOfItems, subTotal, total } = useContext(CartContext);

   const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total };

   return (
      <section>
         <div>
            <span>Total de Platos</span>
         </div>

         <div>
            <span>
               {summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'platos' : 'plato'}
            </span>
         </div>

         <div>
            <span>Subtotal</span>
         </div>

         <div>
            <span>{currency.format(summaryValues.subTotal)}</span>
         </div>

         <div>
            <span>Total:</span>
         </div>

         <div>
            <span>{currency.format(summaryValues.total)}</span>
         </div>
      </section>
   );
};
