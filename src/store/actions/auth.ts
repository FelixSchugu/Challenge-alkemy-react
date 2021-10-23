import { LoginEnumTypes } from "../actionsTypes";

type UserType = {
  username: string;
  password: string;
};

export const UserAuthActions = {
  authUser: (user: UserType) => ({
    type: LoginEnumTypes.LOGIN_REQUESTED,
    payload: user,
  }),
  authWithToken: () => ({ type: LoginEnumTypes.LOGIN_WITH_TOKEN }),
  logout: () => ({ type: LoginEnumTypes.LOGOUT }),
  disableErrors: () => ({ type: LoginEnumTypes.LOGIN_DISABLE_ERRORS }),
};

