import { createContext } from 'react';

interface ContextProps {
   isMenuOpen: boolean;
   isCartSummaryOpen: boolean;
   isProductsMenuOpen: boolean;
   isAdminMenuOpen: boolean;
   isViandasMenuOpen: boolean;
   deliveryDateSelected: Date;

   toggleSideMenu: () => void;
   toggleCartSummary: () => void;
   toggleProductsMenu: () => void;
   toggleAdminMenu: () => void;
   toggleViandasMenu: () => void;
   selectDeliveryDate: (date: Date) => void;
}

export const UIContext = createContext({} as ContextProps);
