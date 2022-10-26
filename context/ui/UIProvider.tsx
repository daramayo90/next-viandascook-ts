import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
   children: ReactNode;
}
export interface UIState {
   isMenuOpen: boolean;
   deliveryDateSelected: string;
}

const UI_INITIAL_STATE: UIState = {
   isMenuOpen: false,
   deliveryDateSelected: '',
};

export const UIProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const toggleSideMenu = () => {
      dispatch({ type: '[UI] - Toggle Menu' });
   };

   const selectDeliveryDate = (date: string) => {
      dispatch({ type: '[UI] - Select Delivery Date', payload: date });
   };

   return (
      <UIContext.Provider value={{ ...state, toggleSideMenu, selectDeliveryDate }}>
         {children}
      </UIContext.Provider>
   );
};
