export const calculation = (quantity: number, subTotal: number): number => {
   if (quantity >= 28 && quantity < 56) return subTotal * 0.1;
   if (quantity >= 56) return subTotal * 0.15;

   return 0;
};
