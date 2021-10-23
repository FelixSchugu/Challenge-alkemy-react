import { all } from "redux-saga/effects";
import { authWatcher } from "./authSagas";
import { searchHeroesWatcher } from "./searchHeroSagas";

export function* rootSaga() {
  yield all([authWatcher(), searchHeroesWatcher()]);
}
