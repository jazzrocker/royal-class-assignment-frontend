import { all } from "redux-saga/effects";
import Signup from "./auth/signupSaga";
import Login from "./auth/loginSaga";
import Logout from "./auth/logoutSaga";

import GetUserData from "./dashboard/getUserDataSaga";
import GetActiveAuctions from "./dashboard/getActiveAuctionsSaga";
import CreateAuction from "./dashboard/createAuctionsSaga";
import JoinAuction from "./dashboard/joinAuctionSaga";

import GetBids from "./bids/getBidsSaga";
import GetUserBids from "./bids/getUserBidsSaga";
import PlaceBid from "./bids/placeBidSaga";

export default function* rootSaga() {
  yield all([
    Signup(),
    Login(),
    Logout(),
    GetUserData(),
    GetActiveAuctions(),
    CreateAuction(),
    JoinAuction(),
    GetBids(),
    GetUserBids(),
    PlaceBid(),
  ]);
}
