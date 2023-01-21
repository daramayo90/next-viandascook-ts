import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
   children: ReactNode;
}
export interface UIState {
   isMenuOpen: boolean;
   isProductsMenuOpen: boolean;
   deliveryDateSelected: Date;
}

const UI_INITIAL_STATE: UIState = {
   isMenuOpen: false,
   isProductsMenuOpen: false,
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

   const selectDeliveryDate = (date: string) => {
      dispatch({ type: '[UI] - Select Delivery Date', payload: date });
   };

   return (
      <UIContext.Provider
         value={{ ...state, toggleSideMenu, toggleProductsMenu, selectDeliveryDate }}>
         {children}
      </UIContext.Provider>
   );
};
