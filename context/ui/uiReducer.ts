import { UIState } from './';

type UIActionType =
   | { type: '[UI] - Toggle Menu' }
   | { type: '[UI] - Toggle Cart Summary' }
   | { type: '[UI] - Toggle Products Menu' }
   | { type: '[UI] - Toggle Admin Menu' }
   | { type: '[UI] - Toggle Kitchen Menu' }
   | { type: '[UI] - Select Delivery Date'; payload: Date }
   | { type: '[UI] - Load Delivery Date from Cookies'; payload: Date };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
   switch (action.type) {
      case '[UI] - Toggle Menu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen,
         };

      case '[UI] - Toggle Cart Summary':
         return {
            ...state,
            isCartSummaryOpen: !state.isCartSummaryOpen,
         };

      case '[UI] - Toggle Products Menu':
         return {
            ...state,
            isProductsMenuOpen: !state.isProductsMenuOpen,
         };

      case '[UI] - Toggle Admin Menu':
         return {
            ...state,
            isAdminMenuOpen: !state.isAdminMenuOpen,
         };

      case '[UI] - Toggle Kitchen Menu':
         return {
            ...state,
            isKitchenMenuOpen: !state.isKitchenMenuOpen,
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
