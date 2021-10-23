import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { searchHeroReducer } from "./searchHeroReducer";
import { heroTeamReducer } from "./heroTeamReducer";

export const rootReducer = combineReducers({
  authReducer,
  searchHeroReducer,
  heroTeamReducer,
});
