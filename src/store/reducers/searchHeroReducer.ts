import { SearchEnumTypes } from "../actionsTypes";
import { SearchSateType } from "../types";

const initialState: SearchSateType = {
  error: false,
  errorMessage: "",
  isLoading: false,
  searchCoincidences: [],
  noResults: false,
};

export const searchHeroReducer = (
  state = initialState,
  action: any
): SearchSateType => {
  switch (action.type) {
    case SearchEnumTypes.SEARCH_REQUESTED:
      return {
        ...state,
        error: false,
        isLoading: true,
        errorMessage: "",
        searchCoincidences: [],
        noResults: false,
      };

    case SearchEnumTypes.SEARCH_SUCCESSFULLY:
      return {
        ...state,
        isLoading: false,
        searchCoincidences: action.data,
      };

    case SearchEnumTypes.SEARCH_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
        error: true,
      };

    case SearchEnumTypes.SEARCH_NO_RESULTS:
      return {
        ...state,
        noResults: true,
        isLoading: false,
      };

    case SearchEnumTypes.INITIALIZE_STATE:
      return initialState;

    default:
      return state;
  }
};
