import { HeroType } from "../../views/types";
import { HeroTeamEnumTypes } from "../actionsTypes";

export const HeroesTeamActions = {
  modifyHero: (newHeroList: HeroType[]) => ({
    type: HeroTeamEnumTypes.MODIFY_HEROES_LIST,
    payload: newHeroList,
  }),

  deleteAllHeroes: () => ({ type: HeroTeamEnumTypes.DELETE_ALL_HEROES }),
};
