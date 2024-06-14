export const isValidEmail = (email: string): boolean => {
   const match = String(email)
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(com|ar|net|xyz|app|es|acm|acm\.org|edu|edu\.ar|educ\.ar)))$/,
      );

   return !!match;
};

export const isEmail = (email: string): string | undefined => {
   return isValidEmail(email) ? undefined : 'No parece un email válido';
};

export const isValidPhone = (phone: string): boolean => {
   const match = String(phone)
      .toLowerCase()
      .match(/^(?:11)(?:(?=\d{0,2}15)\d{2})??\d{8}$/);

   return !!match;
};

export const isPhone = (phone: string): string | undefined => {
   return isValidPhone(phone) ? undefined : 'Con 11, sin 15 y debe tener 10 dígitos';
};
