import { all, call, put, takeEvery } from "redux-saga/effects";
import API from "../../../Utils/api";
import {
  getUserdataSuccess,
  getUserdataFailure,
} from "../../Action/dashboard/getUserDataAction";
import { GET_USERDATA } from "../../Action/actionTypes";
import {
  getLocalStorageItem,
  notifyError,
  setLocalStorageItem,
} from "../../../Utils/Helper";
import { loginSuccess } from "../../Action";

function* getUserdataRequest(action) {
  try {
    const { data } = yield API.get("/auth/getuserdata");
    if (data?.meta?.code === 200) {
      yield put(getUserdataSuccess(data?.data));
      yield put(loginSuccess(data?.data));
      yield call(setLocalStorageItem, "userData", JSON.stringify(data?.data));
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data);
      }
    } else {
      yield put(getUserdataFailure());
      notifyError("Invalid Request");
    }
  } catch (error) {
    yield put(getUserdataFailure());
    notifyError("Invalid Request");
  }
}

export function* watchGetUserdataAPI() {
  yield takeEvery(GET_USERDATA, getUserdataRequest);
}

export default function* rootSaga() {
  yield all([watchGetUserdataAPI()]);
}
