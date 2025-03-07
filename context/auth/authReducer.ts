import { IUser } from '../../interfaces';
import { AuthState } from './';

type AuthActionType =
   | { type: '[Auth] - Login'; payload: IUser }
   | { type: '[Auth] - Logout' }
   | { type: '[Auth] - New Address'; payload: IUser }
   | { type: '[Auth] - AuthLoaded' };

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
   switch (action.type) {
      case '[Auth] - Login':
         return {
            ...state,
            isLoggedIn: true,
            user: action.payload,
         };

      case '[Auth] - Logout':
         return {
            ...state,
            isLoggedIn: false,
            user: undefined,
         };

      case '[Auth] - New Address':
         return {
            ...state,
            isLoggedIn: true,
            user: action.payload,
         };

      case '[Auth] - AuthLoaded':
         return {
            ...state,
            isAuthLoaded: true,
         };

      default:
         return state;
   }
};
