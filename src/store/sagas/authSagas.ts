import { call, put, takeEvery } from "@redux-saga/core/effects";
import { authUser } from "../../helpers/serverRequests";
import { Types } from "../actionsTypes";
import { FetchResponseType } from "../types";

function* fetchingUserData(action: any) {
  try {
    const response: FetchResponseType = yield call(authUser, action.payload);
    console.log(response);

    if (response.status === 200) {
      yield put({
        type: Types.LOGIN_SUCCESSFULLY,
        token: response.data?.token,
      });
    } else {
      yield put({
        type: Types.LOGIN_FAILED,
        error: "Credenciales incorrectas",
      });
    }
  } catch (error) {
    yield put({
      type: Types.LOGIN_FAILED,
      error: "Error interno del servidor",
    });
  }
}

export function* authWatcher() {
  yield takeEvery(Types.LOGIN_REQUESTED, fetchingUserData);
}
