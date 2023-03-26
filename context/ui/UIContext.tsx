import { createContext } from 'react';

interface ContextProps {
   isMenuOpen: boolean;
   isCartSummaryOpen: boolean;
   isProductsMenuOpen: boolean;
   isAdminMenuOpen: boolean;
   isKitchenMenuOpen: boolean;
   deliveryDateSelected: Date;

   toggleSideMenu: () => void;
   toggleCartSummary: () => void;
   toggleProductsMenu: () => void;
   toggleAdminMenu: () => void;
   toggleKitchenMenu: () => void;
   selectDeliveryDate: (date: Date) => void;
}

export const UIContext = createContext({} as ContextProps);
