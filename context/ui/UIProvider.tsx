import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
   children: ReactNode;
}
export interface UIState {
   isMenuOpen: boolean;
   isProductsMenuOpen: boolean;
   isAdminMenuOpen: boolean;
   deliveryDateSelected: Date;
}

const UI_INITIAL_STATE: UIState = {
   isMenuOpen: false,
   isProductsMenuOpen: false,
   isAdminMenuOpen: false,
   deliveryDateSelected: new Date(),
};

export const UIProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const toggleSideMenu = () => {
      dispatch({ type: '[UI] - Toggle Menu' });
   };

   const toggleProductsMenu = () => {
      dispatch({ type: '[UI] - Toggle Products Menu' });
   };

   const toggleAdminMenu = () => {
      dispatch({ type: '[UI] - Toggle Admin Menu' });
   };

   const selectDeliveryDate = (date: Date) => {
      dispatch({ type: '[UI] - Select Delivery Date', payload: date });
   };

   return (
      <UIContext.Provider
         value={{
            ...state,
            toggleSideMenu,
            toggleProductsMenu,
            toggleAdminMenu,
            selectDeliveryDate,
         }}>
         {children}
      </UIContext.Provider>
   );
};
