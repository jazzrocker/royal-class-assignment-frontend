import {
  CREATE_AUCTION,
  CREATE_AUCTION_SUCCESS,
  CREATE_AUCTION_FAILURE,
} from "../../Action/actionTypes";

const INIT_STATE = {
  loading: false,
  auction: [],
};

const createAuctionsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_AUCTION:
      return { ...state, loading: true };
    case CREATE_AUCTION_SUCCESS:
      return {
        ...state,
        auction: action?.payload,
        loading: false,
      };
    case CREATE_AUCTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default createAuctionsReducer;
