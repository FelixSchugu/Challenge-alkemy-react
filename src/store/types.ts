import { HeroType } from "../views/types";

export type AuthStateType = {
  isLoading: boolean;
  isAuth: boolean;
  token: string | null | void;
  error: boolean;
  errorMessage: string;
};

export type SearchSateType = {
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  searchCoincidences: any[];
  noResults: boolean;
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

export type SearchRootType = {
  searchHeroReducer: SearchSateType;
};

export type HeroesTeamRootType = {
  heroTeamReducer: { myTeam: HeroType[] };
};
