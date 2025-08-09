import {
  JOIN_AUCTION,
  JOIN_AUCTION_SUCCESS,
  JOIN_AUCTION_FAILURE,
} from "../../Action/actionTypes";

const INIT_STATE = {
  loading: false,
  joinedAuction: [],
};

const joinAuctionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case JOIN_AUCTION:
      return { ...state, loading: true };
    case JOIN_AUCTION_SUCCESS:
      return {
        ...state,
        joinedAuction: action?.payload,
        loading: false,
      };
    case JOIN_AUCTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default joinAuctionReducer;
