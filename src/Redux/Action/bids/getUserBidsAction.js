import {
  GET_USER_BIDS,
  GET_USER_BIDS_SUCCESS,
  GET_USER_BIDS_FAILURE,
} from "../actionTypes";

export const getUserBids = (payload) => ({
  type: GET_USER_BIDS,
  payload,
});

export const getUserBidsSuccess = (payload) => ({
  type: GET_USER_BIDS_SUCCESS,
  payload,
});

export const getUserBidsFailure = () => ({
  type: GET_USER_BIDS_FAILURE,
});
