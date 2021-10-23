import { AuthStateType } from "../types";
import { LoginEnumTypes } from "../actionsTypes";
import { deleteItem, saveItem } from "../../helpers/localStorage";
import { LocalStorageKeys } from "../../helpers/localStorage";

const initialState: AuthStateType = {
  error: false,
  errorMessage: "",
  isAuth: false,
  isLoading: false,
  token: null,
};

export const authReducer = (
  state = initialState,
  action: any
): AuthStateType | undefined => {
  switch (action.type) {
    case LoginEnumTypes.LOGIN_SUCCESSFULLY:
      return {
        error: false,
        isAuth: true,
        isLoading: false,
        errorMessage: "",
        token: saveItem(LocalStorageKeys.TOKEN, action.token),
      };
    case LoginEnumTypes.LOGIN_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: "",
      };

    case LoginEnumTypes.LOGIN_FAILED:
      return {
        ...state,
        errorMessage: action.error,
        isLoading: false,
        error: true,
      };

    case LoginEnumTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: deleteItem(LocalStorageKeys.TOKEN),
      };

    case LoginEnumTypes.LOGIN_WITH_TOKEN:
      return {
        ...state,
        isAuth: true,
      };

    case LoginEnumTypes.LOGIN_DISABLE_ERRORS:
      return {
        ...state,
        error: false,
        errorMessage: "",
      };

    default:
      return state; 
  }
};
