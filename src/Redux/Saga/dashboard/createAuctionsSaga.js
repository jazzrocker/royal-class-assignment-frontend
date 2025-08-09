import { all, call, put, takeEvery } from "redux-saga/effects";
import API from "../../../Utils/api";
import {
  createAuctionsSuccess,
  createAuctionsFailure,
} from "../../Action/dashboard/createAuctionsAction";
import { CREATE_AUCTION } from "../../Action/actionTypes";
import { notifyError } from "../../../Utils/Helper";

function* createAuctionsRequest(action) {
  try {
    const { payload } = action?.payload;
    const { data } = yield API.post("/auctions/create", payload);
    if (data?.meta?.code === 200) {
      yield put(createAuctionsSuccess(data?.data));
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data);
      }
    } else {
      yield put(createAuctionsFailure());
      notifyError("Invalid Request");
    }
  } catch (error) {
    yield put(createAuctionsFailure());
    notifyError("Invalid Request");
  }
}

export function* watchCreateAuctionsAPI() {
  yield takeEvery(CREATE_AUCTION, createAuctionsRequest);
}

export default function* rootSaga() {
  yield all([watchCreateAuctionsAPI()]);
}
