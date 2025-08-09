import { all, call, put, takeEvery } from "redux-saga/effects";
import API from "../../../Utils/api";
import {
  joinAuctionSuccess,
  joinAuctionFailure,
} from "../../Action/dashboard/joinAuctionAction";
import { JOIN_AUCTION } from "../../Action/actionTypes";
import { notifyError, notifyPromise } from "../../../Utils/Helper";

function* JoinAuctionRequest(action) {
  try {
    const { auctionId, method } = action?.payload;

    const { data } = yield notifyPromise(
      API.get(`/auctions/join-leave-auction?auctionId=${auctionId}&method=${method}`),
      "Joining Auction Room..."
    );
    if (data?.meta?.code === 200) {
      yield put(joinAuctionSuccess(data?.data));
      if (action?.payload?.callback) {
        yield call(action.payload.callback, data);
      }
    } else {
      yield put(joinAuctionFailure());
      notifyError("Invalid Request");
    }
  } catch (error) {
    yield put(joinAuctionFailure());
    notifyError("Invalid Request");
  }
}

export function* watchJoinAuctionAPI() {
  yield takeEvery(JOIN_AUCTION, JoinAuctionRequest);
}

export default function* rootSaga() {
  yield all([watchJoinAuctionAPI()]);
}
