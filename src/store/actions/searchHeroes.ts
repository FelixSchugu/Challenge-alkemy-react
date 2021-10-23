import { SearchEnumTypes } from "../actionsTypes";

export const SearchHeroActions = {
  searchHero: (value: string) => ({
    type: SearchEnumTypes.SEARCH_REQUESTED,
    payload: value,
  }),
  initializeState: () => ({ type: SearchEnumTypes.INITIALIZE_STATE }),
};
