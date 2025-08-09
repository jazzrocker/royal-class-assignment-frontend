import {
  GET_USER_BIDS,
  GET_USER_BIDS_SUCCESS,
  GET_USER_BIDS_FAILURE,
} from "../../Action/actionTypes";

const INIT_STATE = {
  loading: false,
  userBids: [],
};

const getUserBidsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_BIDS:
      return { ...state, loading: true };
    case GET_USER_BIDS_SUCCESS:
      return {
        ...state,
        userBids: action?.payload,
        loading: false,
      };
    case GET_USER_BIDS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getUserBidsReducer;
