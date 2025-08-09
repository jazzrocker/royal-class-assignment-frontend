import {
  GET_ACTIVE_AUCTIONS,
  GET_ACTIVE_AUCTIONS_SUCCESS,
  GET_ACTIVE_AUCTIONS_FAILURE,
} from "../../Action/actionTypes";

const INIT_STATE = {
  loading: false,
  activeAuctions: [],
};

const getActiveAuctionsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVE_AUCTIONS:
      return { ...state, loading: true };
    case GET_ACTIVE_AUCTIONS_SUCCESS:
      return {
        ...state,
        activeAuctions: action?.payload,
        loading: false,
      };
    case GET_ACTIVE_AUCTIONS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getActiveAuctionsReducer;
