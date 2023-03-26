import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
   children: ReactNode;
}
export interface UIState {
   isMenuOpen: boolean;
   isCartSummaryOpen: boolean;
   isProductsMenuOpen: boolean;
   isAdminMenuOpen: boolean;
   isKitchenMenuOpen: boolean;
   deliveryDateSelected: Date;
}

const UI_INITIAL_STATE: UIState = {
   isMenuOpen: false,
   isCartSummaryOpen: false,
   isProductsMenuOpen: false,
   isAdminMenuOpen: false,
   isKitchenMenuOpen: false,
   deliveryDateSelected: new Date(),
};

export const UIProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const toggleSideMenu = () => {
      dispatch({ type: '[UI] - Toggle Menu' });
   };

   const toggleCartSummary = () => {
      dispatch({ type: '[UI] - Toggle Cart Summary' });
   };

   const toggleProductsMenu = () => {
      dispatch({ type: '[UI] - Toggle Products Menu' });
   };

   const toggleAdminMenu = () => {
      dispatch({ type: '[UI] - Toggle Admin Menu' });
   };

   const toggleKitchenMenu = () => {
      dispatch({ type: '[UI] - Toggle Kitchen Menu' });
   };

   const selectDeliveryDate = (date: Date) => {
      dispatch({ type: '[UI] - Select Delivery Date', payload: date });
   };

   return (
      <UIContext.Provider
         value={{
            ...state,
            toggleSideMenu,
            toggleCartSummary,
            toggleProductsMenu,
            toggleAdminMenu,
            toggleKitchenMenu,
            selectDeliveryDate,
         }}>
         {children}
      </UIContext.Provider>
   );
};
