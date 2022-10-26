import { createContext } from 'react';

interface ContextProps {
   isMenuOpen: boolean;
   deliveryDateSelected: string;

   toggleSideMenu: () => void;
   selectDeliveryDate: (date: string) => void;
}

export const UIContext = createContext({} as ContextProps);
