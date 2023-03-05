import { EmailsState } from './';

type EmailsActionType = { type: '[Emails] - ActionName' };

export const emailsReducer = (state: EmailsState, action: EmailsActionType): EmailsState => {
   switch (action.type) {
      case '[Emails] - ActionName':
         return {
            ...state,
         };

      default:
         return state;
   }
};
