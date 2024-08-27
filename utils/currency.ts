/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl */

export const format = (value: number) => {
   const formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   });

   return formatter.format(value);
};

export const formatWithoutDecimals = (value: number) => {
   const formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   });

   return formatter.format(value);
};
