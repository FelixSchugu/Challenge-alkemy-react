import { Types } from "../actionsTypes";

type UserType = {
  username: string;
  password: string;
};

export const UserAuthActions = {
  authUser: (user: UserType) => ({
    type: Types.LOGIN_REQUESTED,
    payload: user,
  }),
  authWithToken: () => ({ type: Types.LOGIN_WITH_TOKEN }),
  logout: () => ({ type: Types.LOGOUT }),
  disableErrors: () => ({ type: Types.LOGIN_DISABLE_ERRORS }),
};

