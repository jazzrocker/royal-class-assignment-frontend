import {
  PLACE_BID,
  PLACE_BID_SUCCESS,
  PLACE_BID_FAILURE,
} from "../../Action/actionTypes";

const INIT_STATE = {
  loading: false,
  placeBid: [],
};

const getActiveAuctionsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PLACE_BID:
      return { ...state, loading: true };
    case PLACE_BID_SUCCESS:
      return {
        ...state,
        placeBid: action?.payload,
        loading: false,
      };
    case PLACE_BID_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getActiveAuctionsReducer;
