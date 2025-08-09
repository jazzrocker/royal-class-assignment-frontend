import { all, call, put, takeEvery } from "redux-saga/effects";
import API from "../../../Utils/api";
import {
  getBidsSuccess,
  getBidsFailure,
} from "../../Action/bids/getBidsAction";
import { GET_BIDS } from "../../Action/actionTypes";
import { notifyError } from "../../../Utils/Helper";

function* getBidsRequest(action) {
  try {
    const { auctionId } = action?.payload;
    const { data } = yield API.get(`/bids/active-bids?auctionId=${auctionId}`);
    
    
    if (data?.meta?.code === 200) {
      yield put(getBidsSuccess(data?.data));
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data);
      }
    } else {
      yield put(getBidsFailure());
      notifyError("Invalid Request");
    }
  } catch (error) {
    yield put(getBidsFailure());
    notifyError("Invalid Request");
  }
}

export function* watchGetBidsAPI() {
  yield takeEvery(GET_BIDS, getBidsRequest);
}

export default function* rootSaga() {
  yield all([watchGetBidsAPI()]);
}
