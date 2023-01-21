import { createContext } from 'react';

interface ContextProps {
   isMenuOpen: boolean;
   isProductsMenuOpen: boolean;
   deliveryDateSelected: Date;

   toggleSideMenu: () => void;
   toggleProductsMenu: () => void;
   selectDeliveryDate: (date: string) => void;
}

export const UIContext = createContext({} as ContextProps);
