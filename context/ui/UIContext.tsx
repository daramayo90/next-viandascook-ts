import { createContext } from 'react';

interface ContextProps {
   isMenuOpen: boolean;
   isProductsMenuOpen: boolean;
   isAdminMenuOpen: boolean;
   deliveryDateSelected: Date;

   toggleSideMenu: () => void;
   toggleProductsMenu: () => void;
   toggleAdminMenu: () => void;
   selectDeliveryDate: (date: Date) => void;
}

export const UIContext = createContext({} as ContextProps);
