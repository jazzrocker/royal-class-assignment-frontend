import { all, call, put, takeEvery } from "redux-saga/effects";
import { notifySuccess, removeLocalStorageItem } from "../../../Utils/Helper";
import { logoutSuccess, logoutFailure } from "../../Action/auth/logoutAction";
import { LOGOUT } from "../../Action/actionTypes";
import API from "../../../Utils/api";

function* logoutRequest(action) {
  try {
    // const { data } = yield call(API.post, "/logout", action?.payload?.payload);

    yield call(removeLocalStorageItem, "userData");
    yield call(removeLocalStorageItem, "token");
    yield put(logoutSuccess());
    notifySuccess("Logged out successfully.");
    if (action?.payload.callback) {
      // yield call(action.payload.callback, data);
    }
  } catch (error) {
    yield put(logoutFailure());
  }
}

export function* watchLogoutAPI() {
  yield takeEvery(LOGOUT, logoutRequest);
}

export default function* rootSaga() {
  yield all([watchLogoutAPI()]);
}
