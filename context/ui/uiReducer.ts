import { UIState } from './';

type UIActionType =
   | { type: '[UI] - Toggle Menu' }
   | { type: '[UI] - Toggle Products Menu' }
   | { type: '[UI] - Select Delivery Date'; payload: string }
   | { type: '[UI] - Load Delivery Date from Cookies'; payload: string };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
   switch (action.type) {
      case '[UI] - Toggle Menu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen,
         };

      case '[UI] - Toggle Products Menu':
         return {
            ...state,
            isProductsMenuOpen: !state.isProductsMenuOpen,
         };

      case '[UI] - Select Delivery Date':
         return {
            ...state,
            deliveryDateSelected: action.payload,
         };

      case '[UI] - Load Delivery Date from Cookies':
         return {
            ...state,
            deliveryDateSelected: action.payload,
         };

      default:
         return state;
   }
};
