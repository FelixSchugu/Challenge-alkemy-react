import { call, put, takeEvery } from "@redux-saga/core/effects";
import { authUser } from "../../helpers/serverRequests";
import { LoginEnumTypes } from "../actionsTypes";
import { FetchResponseType } from "../types";

function* fetchingUserData(action: any) {
  try {
    const response: FetchResponseType = yield call(authUser, action.payload);
    console.log(response);

    if (response.status === 200) {
      yield put({
        type: LoginEnumTypes.LOGIN_SUCCESSFULLY,
        token: response.data?.token,
      });
    } else {
      yield put({
        type: LoginEnumTypes.LOGIN_FAILED,
        error: "Datos incorrectos",
      });
    }
  } catch (error) {
    yield put({
      type: LoginEnumTypes.LOGIN_FAILED,
      error: "Datos incorrectos",
    });
  }
}

export function* authWatcher() {
  yield takeEvery(LoginEnumTypes.LOGIN_REQUESTED, fetchingUserData);
}
