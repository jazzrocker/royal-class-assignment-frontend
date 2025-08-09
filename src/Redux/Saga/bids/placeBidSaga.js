import { all, call, put, takeEvery } from "redux-saga/effects";
import API from "../../../Utils/api";
import {
  placeBidSuccess,
  placeBidFailure,
} from "../../Action/bids/placeBidAction";
import { PLACE_BID } from "../../Action/actionTypes";
import { notifyError, notifyPromise } from "../../../Utils/Helper";

function* placeBidRequest(action) {
  try {
    const { method, payload } = action?.payload;

    const { data } = yield notifyPromise(
      API.post(`/bids/place-cancel-bid?method=${method}`, payload),
      "Placing your bid..."
    );
    if (data?.meta?.code === 200) {
      yield put(placeBidSuccess(data?.data));
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data);
      }
    } else {
      yield put(placeBidFailure());
    }
  } catch (error) {
    yield put(placeBidFailure());
  }
}

export function* watchPlaceBidAPI() {
  yield takeEvery(PLACE_BID, placeBidRequest);
}

export default function* rootSaga() {
  yield all([watchPlaceBidAPI()]);
}
