import { all, call, put, takeEvery } from "redux-saga/effects";
import API from "../../../Utils/api";
import {
  getUserBidsSuccess,
  getUserBidsFailure,
} from "../../Action/bids/getUserBidsAction";
import { GET_USER_BIDS } from "../../Action/actionTypes";
import { notifyError } from "../../../Utils/Helper";

function* getUserBidsRequest(action) {
  try {
    const { data } = yield API.get(`/bids/my-bids`);

    if (data?.meta?.code === 200) {
      yield put(getUserBidsSuccess(data?.data));
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data);
      }
    } else {
      yield put(getUserBidsFailure());
      notifyError("Invalid Request");
    }
  } catch (error) {
    yield put(getUserBidsFailure());
    notifyError("Invalid Request");
  }
}

export function* watchGetUserBidsAPI() {
  yield takeEvery(GET_USER_BIDS, getUserBidsRequest);
}

export default function* rootSaga() {
  yield all([watchGetUserBidsAPI()]);
}
