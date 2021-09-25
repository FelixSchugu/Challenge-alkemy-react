export type AuthStateType = {
  isLoading: boolean;
  isAuth: boolean;
  token: string | null | void;
  error: boolean;
  errorMessage: string;
};

export type FetchResponseType = {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number | string;
  statusText?: string;
};

export type AuthRootState = {
  authReducer: AuthStateType;
};
