import { HeroType } from "../../views/types";
import { HeroTeamEnumTypes } from "../actionsTypes";

const initialState: { myTeam: HeroType[] } = {
  myTeam: [],
};

export const heroTeamReducer = (
  state = initialState,
  action: any
): { myTeam: HeroType[] } => {
  switch (action.type) {
    case HeroTeamEnumTypes.MODIFY_HEROES_LIST:
      return {
        myTeam: [...action.payload],
      };

    case HeroTeamEnumTypes.DELETE_ALL_HEROES:
      return {
        myTeam: [],
      };

    default:
      return state;
  }
};
