import {
  GET_BIDS,
  GET_BIDS_SUCCESS,
  GET_BIDS_FAILURE,
} from "../../Action/actionTypes";

const INIT_STATE = {
  loading: false,
  allBids: [],
};

const getBidsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BIDS:
      return { ...state, loading: true };
    case GET_BIDS_SUCCESS:
      return {
        ...state,
        allBids: action?.payload,
        loading: false,
      };
    case GET_BIDS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getBidsReducer;
