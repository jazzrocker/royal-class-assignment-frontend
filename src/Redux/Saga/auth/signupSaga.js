import { all, call, put, takeEvery } from "redux-saga/effects";
import API from "../../../Utils/api";
import { notifyPromise, setLocalStorageItem } from "../../../Utils/Helper";
import { signupSuccess, signupFailure } from "../../Action/auth/signupAction";
import { SIGNUP } from "../../Action/actionTypes";
import { loginSuccess } from "../../Action";


function* signupRequest(action) {
  try {
    const { data } = yield notifyPromise(
      API.post("/auth/signup", action?.payload?.payload)
    );
    if (data?.meta?.code === 200) {
      yield put(signupSuccess(data?.data?.userData));
      // yield put(loginSuccess(data?.data?.userData));
      // yield call(setLocalStorageItem, "userData", JSON.stringify(data?.data?.userData));
      // yield call(setLocalStorageItem, "token", data?.data?.token);
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data);
      }
    } else {
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data?.data);
      }
      yield put(signupFailure());
    }
  } catch (error) {
    if (action?.payload?.callback) {
      yield call(action.payload.callback, {});
    }
    yield put(signupFailure());
  }
}

export function* watchSignupAPI() {
  yield takeEvery(SIGNUP, signupRequest);
}

export default function* rootSaga() {
  yield all([watchSignupAPI()]);
}
