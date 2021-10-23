import { call, put, takeEvery } from "@redux-saga/core/effects";
import { searchHeroesData } from "../../helpers/serverRequests";
import { SearchEnumTypes } from "../actionsTypes";
import { FetchResponseType } from "../types";

function* searchHeroes(action: any) {
  try {
    const response: FetchResponseType = yield call(
      searchHeroesData,
      action.payload
    );

    // console.log(response);

    if (response.status === 200 && response.data.error) {
      yield put({ type: SearchEnumTypes.SEARCH_NO_RESULTS });
      return;
    }

    if (response.status === 200) {
      yield put({
        type: SearchEnumTypes.SEARCH_SUCCESSFULLY,
        data: response.data?.results,
      });
    } else {
      yield put({
        type: SearchEnumTypes.SEARCH_FAILED,
        error: "Error, no se ha podido realizar la búsqueda",
      });
    }
  } catch (error) {
    yield put({
      type: SearchEnumTypes.SEARCH_FAILED,
      error: "Error, no se ha podido realizar la búsqueda",
    });
  }
}

export function* searchHeroesWatcher() {
  yield takeEvery(SearchEnumTypes.SEARCH_REQUESTED, searchHeroes);
}
