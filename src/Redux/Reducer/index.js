import { combineReducers } from "redux";

import Signup from "./auth/signupReducer";
import Login from "./auth/loginReducer";
import Logout from "./auth/logoutReducer";

import GetUserData from "./dashboard/getUserdataReducer";
import GetActiveAuctions from "./dashboard/getActiveAuctionsReducer";
import CreateAuction from "./dashboard/createAuctionsReducer";
import joinAuctionReducer from "./dashboard/joinAuctionReducer";

import GetBids from "./bids/getBidsReducer";
import UserBids from "./bids/getUserBidsReducer";
import PlaceBid from "./bids/placeBidReducer";

const appReducer = combineReducers({
  Signup,
  Login,
  Logout,
  GetUserData,
  GetActiveAuctions,
  CreateAuction,
  joinAuctionReducer,
  GetBids,
  UserBids,
  PlaceBid,
});

const reducers = (state, action) => {
  return appReducer(state, action);
};

export default reducers;
