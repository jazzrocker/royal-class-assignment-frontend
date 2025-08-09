import { all, call, put, takeEvery } from "redux-saga/effects";
import API from "../../../Utils/api";
import {
  getActiveAuctionsSuccess,
  getActiveAuctionsFailure,
} from "../../Action/dashboard/getActiveAuctionsAction";
import { GET_ACTIVE_AUCTIONS } from "../../Action/actionTypes";
import {
  notifyError,
} from "../../../Utils/Helper";

function* getActiveAuctionsRequest(action) {
  try {
    const { data } = yield API.get("/auction/active");
    if (data?.meta?.code === 200) {
      yield put(getActiveAuctionsSuccess(data?.data?.auctions));
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data);
      }
    } else {
      yield put(getActiveAuctionsFailure());
      notifyError("Invalid Request");
    }
  } catch (error) {
    yield put(getActiveAuctionsFailure());
    notifyError("Invalid Request");
  }
}

export function* watchGetActiveAuctionsAPI() {
  yield takeEvery(GET_ACTIVE_AUCTIONS, getActiveAuctionsRequest);
}

export default function* rootSaga() {
  yield all([watchGetActiveAuctionsAPI()]);
}
