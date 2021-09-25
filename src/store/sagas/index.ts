import { all } from "redux-saga/effects";
import { authWatcher } from "./authSagas";

export function* rootSaga() {
  yield all([authWatcher()]);
}
