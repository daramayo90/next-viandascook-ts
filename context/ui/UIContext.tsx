import { createContext } from 'react';

interface ContextProps {
   isMenuOpen: boolean;
   isProductsMenuOpen: boolean;
   deliveryDateSelected: string;

   toggleSideMenu: () => void;
   toggleProductsMenu: () => void;
   selectDeliveryDate: (date: string) => void;
}

export const UIContext = createContext({} as ContextProps);
